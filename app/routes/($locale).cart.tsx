import {useLoaderData} from 'react-router';
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from 'react-router';
import {CartMain} from '~/components/CartMain';
import {useConfig} from '~/utils/themeContext';
import {CartForm} from '@shopify/hydrogen';
import {HeadersFunction, data} from 'react-router';
import {Link} from 'react-router';
import {useEffect} from 'react';
import {redirect} from 'react-router';
import {PrepareDesignsForCheckout} from '~/components/PrepareDesignsForCheckout';
import {downloadAndReuploadToCloudinary} from '~/utils/cloudinaryUpload';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: 'Your Cart | Official Store'}];
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

        // Enhanced logging for custom attributes
        if (inputs.lines?.some((line: any) => line.attributes?.length > 0)) {
          console.log('📦 Custom attributes detected in cart action:');
          inputs.lines.forEach((line: any, index: number) => {
            if (line.attributes?.length > 0) {
              console.log(`Line ${index + 1}:`, {
                merchandiseId: line.merchandiseId,
                quantity: line.quantity,
                attributeCount: line.attributes.length,
                attributes: line.attributes.map((attr: any) => ({
                  key: attr.key,
                  value: attr.key.startsWith('_design')
                    ? `${attr.value.substring(0, 30)}...`
                    : attr.value,
                })),
              });
            }
          });
        }

        result = await cart.addLines(inputs.lines);
        console.log('Cart addLines result:', result);

        // Log cart line attributes after addition
        if (result?.cart?.lines?.nodes) {
          console.log('📦 Cart lines after addition:');
          result.cart.lines.nodes.forEach((line: any, index: number) => {
            console.log(`Line ${index + 1}:`, {
              id: line.id,
              title: line.merchandise?.product?.title,
              variantTitle: line.merchandise?.title,
              quantity: line.quantity,
              attributeCount: line.attributes?.length || 0,
              attributes: line.attributes || [],
            });
          });
        }

        // Log that custom designs have been added
        const addedLines = inputs.lines;
        const hasCustomDesigns = addedLines.some((line: any) => 
          line.attributes?.some((attr: any) => 
            attr.key === '_custom_design' && attr.value === 'true'
          )
        );

        if (hasCustomDesigns) {
          console.log('🎨 Cart contains custom design products for checkout display');
        }
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
      case CartForm.ACTIONS.AttributesUpdateInput: {
        result = await cart.updateAttributes(inputs.attributes);
        break;
      }
      default:
        throw new Error(`${action} cart action is not defined`);
    }
  } catch (error) {
    console.error(`Error handling cart action: ${error}`);
    console.error('Error details:', error);
    return data(
      {
        cart: null,
        errors: [{message: `Error handling cart action: ${error}`}],
        warnings: [],
        analytics: {
          cartId: null,
        },
      },
      {status: 500},
    );
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  console.log('Final cart result:', {
    cartId,
    hasCart: !!cartResult,
    totalQuantity: cartResult?.totalQuantity,
    errors,
    warnings,
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
export async function loader({context}: LoaderFunctionArgs) {
  const {cart} = context;
  const cartId = cart.getCartId();

  // Redirect to the home page if the cart is empty
  if (!cartId) {
    return redirect('/');
  }

  // Load the cart data
  const cartData = await cart.get();
  
  return data({
    cart: cartData,
  });
}

/**
 * Cart page component
 */
export default function Cart() {
  const loaderData = useLoaderData<typeof loader>();
  const cart = loaderData?.cart;
  const config = useConfig();

  // Check if any items in the cart have custom designs
  const hasCustomDesigns = cart?.lines?.nodes?.some((line: any) => 
    line.attributes?.some((attr: any) => attr.key === '_custom_design' && attr.value === 'true')
  );

  // Use effect to call our prepare checkout endpoint when the cart changes
  useEffect(() => {
    if (hasCustomDesigns && cart) {
      // Additional client-side preparation for checkout
      const prepareCheckout = async () => {
        try {
          console.log('📦 Preparing cart for checkout with custom designs...');
          
          // First ensure all custom design images are properly uploaded to Cloudinary
          const customDesignItems = cart.lines?.nodes?.filter((line: any) => 
            line.attributes?.some((attr: any) => attr.key === '_custom_design' && attr.value === 'true')
          ) || [];
          
          // Process each custom design item
          for (const line of customDesignItems) {
            // Find design image URL attributes
            const designImageUrl = line.attributes?.find(
              (attr: any) => attr.key === '_design_image_url'
            )?.value;
            
            const customizedImage = line.attributes?.find(
              (attr: any) => attr.key === '_customized_image'
            )?.value;
            
            // If we have a design image URL that's valid, ensure it's uploaded to Cloudinary
            if (
              designImageUrl && 
              typeof designImageUrl === 'string' && 
              designImageUrl.startsWith('http')
            ) {
              try {
                console.log(`🔄 Processing design image: ${designImageUrl.substring(0, 50)}...`);
                // Re-upload to ensure permanent storage if it's not already a Cloudinary URL
                if (!designImageUrl.includes('cloudinary.com')) {
                  await downloadAndReuploadToCloudinary(designImageUrl, {
                    folder: 'cart-checkout-images'
                  });
                }
              } catch (imageError) {
                console.error('Error processing design image:', imageError);
              }
            }
            
            if (
              customizedImage && 
              typeof customizedImage === 'string' && 
              customizedImage.startsWith('http') &&
              customizedImage !== designImageUrl
            ) {
              try {
                console.log(`🔄 Processing customized image: ${customizedImage.substring(0, 50)}...`);
                // Re-upload to ensure permanent storage if it's not already a Cloudinary URL
                if (!customizedImage.includes('cloudinary.com')) {
                  await downloadAndReuploadToCloudinary(customizedImage, {
                    folder: 'cart-checkout-images'  
                  });
                }
              } catch (imageError) {
                console.error('Error processing customized image:', imageError);
              }
            }
          }

          // Now call the API to update the cart with prepared image URLs
          console.log('📤 Sending cart prepare request to API...');
          const response = await fetch('/api/cart-prepare-checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cartId: cart.id
            }),
          });
          
          if (!response.ok) {
            console.error('Failed to prepare checkout:', await response.text());
          } else {
            const result = await response.json();
            console.log('✅ Cart prepared for checkout:', result);
          }
        } catch (error) {
          console.error('Error preparing checkout:', error);
        }
      };
      
      prepareCheckout();
    }
  }, [cart?.id, hasCustomDesigns, cart]);

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="cart-page-container container mx-auto px-4"
        style={{
          paddingTop: 'calc(var(--header-height-desktop) + 2rem)',
          paddingBottom: '2rem',
        }}
      >
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          {!cart?.totalQuantity ? 'Your Cart is Empty' : 'Your Cart'}
        </h1>

        {/* Main cart component - handles empty state and populated cart */}
        <CartMain 
          cart={cart}
          layout="page"
        />

        {/* Continue shopping button when cart is empty */}
        {!cart?.totalQuantity && (
          <div className="flex justify-center mt-10">
            <Link
              to="/collections"
              className="inline-block bg-primary hover:bg-primary-600 text-background px-6 py-3 rounded-sm transition-colors duration-200 font-bold"
            >
              Continue Shopping
            </Link>
          </div>
        )}
        
        {/* Add the prepare designs component to ensure checkout displays custom images */}
        {hasCustomDesigns && cart && <PrepareDesignsForCheckout cart={cart} />}
      </div>
    </div>
  );
}
