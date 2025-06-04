import {ActionFunctionArgs} from 'react-router';
import {uploadCanvasToCloudinary, downloadAndReuploadToCloudinary} from '~/utils/cloudinaryUpload';
import type {CartLineFragment} from 'storefrontapi.generated';

/**
 * Helper function to get the base URL from a request
 */
function getBaseUrlFromRequest(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

/**
 * This API route is called before checkout to ensure all custom design images
 * are properly uploaded to Cloudinary and stored as cart attributes.
 * This ensures the order will have all the designed images visible to
 * the fulfillment team, not just the original variant images.
 */
export async function action({request, context}: ActionFunctionArgs) {
  const baseUrl = getBaseUrlFromRequest(request);
  console.log(`🛒 API cart-prepare-checkout called from ${baseUrl}`);

  try {
    // Get the cart ID from the request based on content type
    let cartId = '';
    const contentType = request.headers.get('Content-Type') || '';
    console.log(`📝 Request Content-Type: ${contentType}`);
    
    if (contentType.includes('application/json')) {
      // Handle JSON request
      try {
        const jsonData = await request.json() as {cartId?: string};
        cartId = String(jsonData.cartId || '');
        console.log(`🔍 Got cartId from JSON body: ${cartId}`);
      } catch (e) {
        console.error(`❌ Error parsing JSON body: ${e instanceof Error ? e.message : String(e)}`);
      }
    } 
    else if (contentType.includes('application/x-www-form-urlencoded') || 
             contentType.includes('multipart/form-data')) {
      // Handle form data request
      try {
        const formData = await request.formData();
        cartId = String(formData.get('cartId') || '');
        console.log(`🔍 Got cartId from form data: ${cartId}`);
      } catch (e) {
        console.error(`❌ Error parsing form data: ${e instanceof Error ? e.message : String(e)}`);
      }
    } 
    else {
      // Get cart ID from URL search params as fallback
      const url = new URL(request.url);
      cartId = url.searchParams.get('cartId') || '';
      console.log(`🔍 Got cartId from URL params: ${cartId}`);
    }
    
    // If we still don't have a cartId, try to get it from the cart context
    if (!cartId) {
      try {
        // Try to get the cart ID from cookie/session
        cartId = context.cart.getCartId();
        if (cartId) {
          console.log(`🔍 Got cartId from cart context: ${cartId}`);
        }
      } catch (e) {
        console.error(`❌ Error getting cartId from context: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    
    if (!cartId) {
      console.error('❌ No cart ID provided for checkout preparation');
      return new Response(JSON.stringify({success: false, error: 'No cart ID provided'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      });
    }

    // Get the current cart from Shopify
    const cartData = await context.cart.get();
    
    if (!cartData) {
      return new Response(JSON.stringify({success: false, error: 'Cart not found'}), {
        status: 404,
        headers: {'Content-Type': 'application/json'},
      });
    }

    console.log(`🛒 Preparing cart ${cartId} for checkout with ${cartData.lines.nodes.length} items`);
    
    // Track if we need to update the cart
    let needsUpdate = false;
    // Keep track of all designed image URLs for this order
    const designedImageUrls: string[] = [];
    // Keep track of cart lines that need custom images
    const cartLinesWithCustomImages: any[] = [];
    
    // First pass - collect all designed images & identify lines with customizations
    for (const line of cartData.lines.nodes) {
      // Check for any design-related attributes
      const designImageUrl = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_design_image_url'
      )?.value;
      
      const customizedImage = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_customized_image'
      )?.value;
      
      const designCloudUrls = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_design_cloud_urls'
      )?.value;
      
      // Handle multiple design URLs (from JSON string)
      if (designCloudUrls && designCloudUrls !== 'STORED_IN_LOCAL_STORAGE') {
        try {
          // Parse the JSON array of design URLs
          const urlsArray = JSON.parse(designCloudUrls);
          if (Array.isArray(urlsArray)) {
            // Add all valid URLs to our collection
            urlsArray.forEach((urlItem: unknown) => {
              const url = urlItem as string;
              if (url && typeof url === 'string' && url.startsWith('http')) {
                designedImageUrls.push(url);
              }
            });
            
            if (urlsArray.length > 0) {
              cartLinesWithCustomImages.push(line);
            }
          }
        } catch (e) {
          console.error('Error parsing design cloud URLs:', e);
        }
      }
      
      // Handle individual design image URLs
      if (designImageUrl && typeof designImageUrl === 'string' && designImageUrl.startsWith('http')) {
        designedImageUrls.push(designImageUrl);
        cartLinesWithCustomImages.push(line);
      }
      
      // Handle customized image URLs
      if (customizedImage && typeof customizedImage === 'string' && customizedImage.startsWith('http')) {
        designedImageUrls.push(customizedImage);
        if (!cartLinesWithCustomImages.includes(line)) {
          cartLinesWithCustomImages.push(line);
        }
      }
    }
    
    console.log(`Found ${designedImageUrls.length} design URLs across ${cartLinesWithCustomImages.length} cart items`);
    
    // Add all designed image URLs to cart attributes
    if (designedImageUrls.length > 0) {
      needsUpdate = true;
      
      // Try to ensure all design URLs are uploaded to our Cloudinary account
      // This prevents broken images if the original URLs expire
      const imageUrlsToUpload = [...designedImageUrls];
      const secureDesignUrls: string[] = [];
      
      // Process images in batches to avoid overwhelming the system
      const batchSize = 3;
      for (let i = 0; i < imageUrlsToUpload.length; i += batchSize) {
        const batch = imageUrlsToUpload.slice(i, i + batchSize);
        const uploadPromises = batch.map(async (url) => {
          // Check if already secure Cloudinary URL
          if (url.includes('cloudinary.com') && url.startsWith('https')) {
            secureDesignUrls.push(url);
            return url;
          }
          
          try {
            // Re-upload to ensure we have a permanent copy
            const secureUrl = await downloadAndReuploadToCloudinary(url, {
              folder: 'checkout_images',
              baseUrl: baseUrl,
            });
            
            if (secureUrl.success && secureUrl.url) {
              secureDesignUrls.push(secureUrl.url);
              return secureUrl.url;
            }
          } catch (error) {
            console.error(`Error securing design URL: ${url}`, error);
          }
          
          // Fallback - use original URL
          secureDesignUrls.push(url);
          return url;
        });
        
        // Wait for this batch to complete
        await Promise.all(uploadPromises);
      }
      
      // Update cart attributes with all secure design URLs
      const cartAttributesUpdate = [
        {
          key: '_all_design_images',
          value: JSON.stringify(secureDesignUrls),
        },
        {
          key: '_checkout_prepared',
          value: 'true',
        },
        {
          key: '_checkout_timestamp',
          value: new Date().toISOString(),
        },
      ];
      
      // Add cart attributes with the secure design URLs
      try {
        await context.cart.updateAttributes(cartAttributesUpdate);
        console.log('✅ Added design URLs to cart attributes');
      } catch (error) {
        console.error('Error updating cart attributes:', error);
      }
    }
    
    // If there are lines with customized images, update their note attributes
    for (const line of cartLinesWithCustomImages) {
      // Find the design URL for this line
      const designImageUrl = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_design_image_url'
      )?.value;
      
      const customizedImage = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_customized_image'
      )?.value;
      
      const designCloudUrls = line.attributes?.find(
        (attr: {key: string; value: string}) => attr.key === '_design_cloud_urls'
      )?.value;
      
      let imageToUse = customizedImage || designImageUrl;
      
      // For multi-designs, use the first one
      if (!imageToUse && designCloudUrls && designCloudUrls !== 'STORED_IN_LOCAL_STORAGE') {
        try {
          const urlsArray = JSON.parse(designCloudUrls);
          if (Array.isArray(urlsArray) && urlsArray.length > 0) {
            imageToUse = urlsArray[0];
          }
        } catch (e) {
          console.error('Error parsing design cloud URLs:', e);
        }
      }
      
      // Only proceed if we have a valid image URL
      if (imageToUse && typeof imageToUse === 'string' && imageToUse.startsWith('http')) {
        try {
          await context.cart.updateLines([{
            id: line.id,
            attributes: [
              // Update or add the checkout-ready image URL
              {
                key: '_checkout_image',
                value: imageToUse,
              },
              {
                key: '_checkout_display_image',
                value: imageToUse,
              },
              {
                key: '_checkout_image_prepared',
                value: 'true',
              },
              // Add the custom design flag explicitly to ensure checkout recognizes it
              {
                key: '_custom_design',
                value: 'true',
              },
              // Add the design URL to the line item as well for redundancy
              {
                key: '_design_image_url',
                value: imageToUse,
              },
              // Make sure we have the customized image as a backup
              {
                key: '_customized_image',
                value: imageToUse,
              },
            ],
          }]);
          
          console.log(`✅ Updated cart line ${line.id} with checkout image: ${imageToUse}`);
          needsUpdate = true;
        } catch (error) {
          console.error(`Error updating cart line ${line.id}:`, error);
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      updated: needsUpdate,
      designImageCount: designedImageUrls.length,
      cartId,
    }), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error) {
    console.error('Error in cart preparation for checkout:', error);
    return new Response(JSON.stringify({
      success: false, 
      error: String(error)
    }), {
      status: 500,
      headers: {'Content-Type': 'application/json'},
    });
  }
} 