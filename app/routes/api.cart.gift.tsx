import {type ActionFunctionArgs} from 'react-router';
import {GIFT_CONFIG, findAutoGiftLine} from '~/utils/giftWithPurchase';

export async function action({request, context}: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = String(formData.get('action'));
  const cartId = String(formData.get('cartId'));

  console.log('🎁 [API] Gift action:', action, 'cartId:', cartId);

  if (!cartId || !['ADD_GIFT', 'REMOVE_GIFT'].includes(action)) {
    return new Response(
      JSON.stringify({success: false, error: 'Invalid request'}),
      {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }

  try {
    if (action === 'ADD_GIFT') {
      // Utiliser directement le variantId de la variante "Cadeau" à 0€
      const variantId = GIFT_CONFIG.variantId;

      // Ajouter le cadeau au panier avec l'attribute d'identification
      const {cartLinesAdd} = await context.storefront.mutate(
        CART_LINES_ADD_MUTATION,
        {
          variables: {
            cartId,
            lines: [
              {
                merchandiseId: variantId,
                quantity: 1,
                attributes: [
                  {
                    key: GIFT_CONFIG.giftAttribute.key,
                    value: GIFT_CONFIG.giftAttribute.value,
                  },
                ],
              },
            ],
          },
        }
      );

      console.log('✅ [API] Gift added to cart');

      return new Response(
        JSON.stringify({
          success: true,
          cart: cartLinesAdd?.cart,
        }),
        {
          status: 200,
          headers: {'Content-Type': 'application/json'},
        }
      );
    } else if (action === 'REMOVE_GIFT') {
      // 1. Récupérer le panier actuel pour trouver la ligne du cadeau
      const {cart} = await context.storefront.query(GET_CART_QUERY, {
        variables: {cartId},
      });

      const giftLine = findAutoGiftLine(cart);

      if (!giftLine) {
        console.log('⚠️ [API] No gift line found to remove');
        return new Response(
          JSON.stringify({success: true, message: 'No gift to remove'}),
          {
            status: 200,
            headers: {'Content-Type': 'application/json'},
          }
        );
      }

      // 2. Retirer la ligne du cadeau
      const {cartLinesRemove} = await context.storefront.mutate(
        CART_LINES_REMOVE_MUTATION,
        {
          variables: {
            cartId,
            lineIds: [giftLine.id],
          },
        }
      );

      console.log('✅ [API] Gift removed from cart');

      return new Response(
        JSON.stringify({
          success: true,
          cart: cartLinesRemove?.cart,
        }),
        {
          status: 200,
          headers: {'Content-Type': 'application/json'},
        }
      );
    }
  } catch (error) {
    console.error('❌ [API] Gift action error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {'Content-Type': 'application/json'},
      }
    );
  }

  return new Response(
    JSON.stringify({success: false, error: 'Invalid action'}),
    {
      status: 400,
      headers: {'Content-Type': 'application/json'},
    }
  );
}

// Query pour récupérer le panier
const GET_CART_QUERY = `#graphql
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      lines(first: 100) {
        nodes {
          id
          quantity
          attributes {
            key
            value
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                handle
              }
            }
          }
        }
      }
    }
  }
` as const;

// Mutation pour ajouter des lignes au panier
const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) {
          nodes {
            id
            quantity
            attributes {
              key
              value
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;

// Mutation pour retirer des lignes du panier
const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        lines(first: 100) {
          nodes {
            id
            quantity
            attributes {
              key
              value
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
` as const;
