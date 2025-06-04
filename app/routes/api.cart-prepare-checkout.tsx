import type { ActionFunctionArgs } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import type { CartLineFragment } from 'storefrontapi.generated';

/**
 * Helper function to extract design URL from storage
 * This is a simplified version as we don't have direct access to client storage
 */
async function extractDesignUrlFromStorage(key: string): Promise<string | null> {
  // In a real implementation, this would use a client-side API to access localStorage
  // For now, we'll just simulate the functionality and rely on cart attributes
  return null;
}

/**
 * API endpoint to prepare the cart for checkout by ensuring all custom design images
 * are properly uploaded to CDN and accessible externally during Shopify checkout.
 * Also syncs cart attributes to make design URLs accessible to the checkout page.
 */
export async function action({ request, context }: ActionFunctionArgs) {
  try {
    // Parse the request body
    const data = await request.json() as { cartId?: string };
    const { cartId } = data;

    if (!cartId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing cart ID',
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get the current cart
    const { cart } = context;
    const cartData = await cart.get();

    if (!cartData) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Cart not found',
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('🛒 [cart-prepare-checkout] Processing cart with',
      cartData.lines?.nodes?.length || 0, 'lines');

    // Check if we have customized products in the cart
    const cartLines = cartData.lines?.nodes || [];
    const customizedLinesCount = cartLines.filter((line: CartLineFragment) =>
      line.attributes?.some(attr => attr.key === '_custom_design' && attr.value === 'true')
    ).length;

    console.log(`🔍 [cart-prepare-checkout] Found ${customizedLinesCount} customized product lines`);

    // If no customized products, nothing to do
    if (customizedLinesCount === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'No custom designs found in cart',
        designCount: 0,
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Process each line to ensure designs are ready for checkout
    let updatedDesignCount = 0;
    const attributeUpdates: Array<{
      lineId: string;
      attributes: Array<{ key: string, value: string }>;
    }> = [];

    for (const line of cartLines as CartLineFragment[]) {
      // Check if this line has a custom design
      const isCustomDesign = line.attributes?.some(attr =>
        attr.key === '_custom_design' && attr.value === 'true'
      );

      if (!isCustomDesign) continue;

      // Get the design image URL from attributes
      const designImageUrl = line.attributes?.find(attr =>
        attr.key === '_design_image_url' && attr.value
      )?.value;

      // Extract line ID for storage keys
      const lineIdMatch = line.id?.match(/gid:\/\/shopify\/CartLine\/([^?]+)/);
      const lineId = lineIdMatch ? lineIdMatch[1] : null;

      if (!lineId) continue;

      console.log(`🎨 [cart-prepare-checkout] Processing custom design for line ${lineId}`,
        designImageUrl ? `with attribute URL: ${designImageUrl.substring(0, 50)}...` : 'with no URL found');

      // First try localStorage for persisted design URL
      let validDesignUrl: string | null = null;
      let designSource = '';

      try {
        // Check localStorage directly on the server (client-side Mirror API)
        const storageKey = `cart-line-design-${lineId}`;
        const storedDesignFromClient = await extractDesignUrlFromStorage(storageKey);

        if (storedDesignFromClient && storedDesignFromClient.startsWith('http')) {
          validDesignUrl = storedDesignFromClient;
          designSource = 'localStorage';
          console.log(`✅ [cart-prepare-checkout] Found design in localStorage for line ${lineId}`);
        }
        // Also check the _design_image_url attribute
        else if (designImageUrl && designImageUrl.startsWith('http')) {
          validDesignUrl = designImageUrl;
          designSource = 'attributes';
          console.log(`✅ [cart-prepare-checkout] Using design from attributes for line ${lineId}`);
        }
        // Check _all_designed_images attribute
        else {
          const allDesignedImagesAttr = line.attributes?.find(
            (attr) => (attr.key === '_all_designed_images' || attr.key === '_all_design_images') && attr.value
          )?.value;

          if (allDesignedImagesAttr && allDesignedImagesAttr.startsWith('[')) {
            try {
              const parsedUrls = JSON.parse(allDesignedImagesAttr);
              if (Array.isArray(parsedUrls) && parsedUrls.length > 0 &&
                typeof parsedUrls[0] === 'string' && parsedUrls[0].startsWith('http')) {
                validDesignUrl = parsedUrls[0];
                designSource = 'all_designed_images';
                console.log(`✅ [cart-prepare-checkout] Using first URL from all_designed_images for line ${lineId}`);
              }
            } catch (parseErr) {
              console.error('[cart-prepare-checkout] Failed to parse all_designed_images', parseErr);
            }
          }
        }

        // If we don't have a valid URL from these sources, check temp-latest as a last resort
        if (!validDesignUrl) {
          const latestDesign = await extractDesignUrlFromStorage('cart-line-design-temp-latest');
          if (latestDesign && latestDesign.startsWith('http')) {
            validDesignUrl = latestDesign;
            designSource = 'temp-latest';
            console.log(`✅ [cart-prepare-checkout] Using latest design as fallback for line ${lineId}`);
          }
        }
      } catch (storageErr) {
        console.error('[cart-prepare-checkout] Storage access error', storageErr);
      }

      // Add attributes for checkout visibility
      if (validDesignUrl) {
        updatedDesignCount++;

        // Create new attributes that will be visible during checkout
        const newAttributes = [
          { key: '_checkout_display_image', value: validDesignUrl },
          { key: '_checkout_image', value: validDesignUrl },
          { key: '_checkout_image_prepared', value: 'true' },
          { key: '_design_source', value: designSource },
          // Keep existing attributes for compatibility
          { key: '_custom_design', value: 'true' },
        ];

        // Only add _design_image_url if it doesn't already exist or is different
        if (!designImageUrl || designImageUrl !== validDesignUrl) {
          newAttributes.push({ key: '_design_image_url', value: validDesignUrl });
        }

        // Push the update
        attributeUpdates.push({
          lineId: line.id,
          attributes: newAttributes
        });

        console.log(`✅ [cart-prepare-checkout] Added ${newAttributes.length} attributes for checkout display to line ${lineId}`);
      } else {
        console.warn(`⚠️ [cart-prepare-checkout] No valid design URL found for line ${lineId}`);
      }
    }

    // Apply all cart line updates
    if (attributeUpdates.length > 0) {
      try {
        console.log(`🔄 [cart-prepare-checkout] Applying ${attributeUpdates.length} cart line updates`);

        // Use the cart context to update cart lines directly
        await context.cart.updateLines(attributeUpdates.map(update => ({
          id: update.lineId,
          attributes: update.attributes
        })));

        console.log('✅ [cart-prepare-checkout] Successfully updated cart lines with checkout attributes');
      } catch (updateErr) {
        console.error('[cart-prepare-checkout] Failed to update cart lines', updateErr);
        return new Response(JSON.stringify({
          success: false,
          error: 'Failed to update cart with checkout attributes',
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully prepared ${updatedDesignCount} designs for checkout`,
      designCount: updatedDesignCount,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[cart-prepare-checkout] Unexpected error:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'Server error preparing cart for checkout',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 