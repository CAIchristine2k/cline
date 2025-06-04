import {ActionFunctionArgs} from 'react-router';
import {uploadCanvasToCloudinary} from '~/utils/cloudinaryUpload';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// Define proper types for the request body
interface CartLinePropertiesRequest {
  imageUrl?: string;
  designStorageKey?: string;
  designType?: 'single' | 'multi';
  _all_designed_images?: string; // JSON string with design URLs
  [key: string]: any; // Allow additional properties
}

// Define property type
interface CartLineProperty {
  key: string;
  value: string;
}

/**
 * This API handles preparing custom design images for Shopify checkout display.
 * Shopify uses line item properties to display images in checkout, but the format
 * is specific. This API converts our stored designs to Shopify-compatible format.
 */
export async function action({request}: ActionFunctionArgs) {
  // Verify this is a POST request
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({error: 'Method not allowed'}), {
      status: 405,
      headers: {'Content-Type': 'application/json'},
    });
  }

  try {
    // Parse the request body
    const body = await request.json() as CartLinePropertiesRequest;
    const {imageUrl, designStorageKey, designType = 'single'} = body;

    if (!imageUrl) {
      return new Response(JSON.stringify({error: 'Image URL is required'}), {
        status: 400,
        headers: {'Content-Type': 'application/json'},
      });
    }

    let finalImageUrl = imageUrl;
    const properties: CartLineProperty[] = [];
    
    // First try to extract design URLs from attributes - most reliable across all environments
    if (body._all_designed_images) {
      try {
        const designUrls = JSON.parse(body._all_designed_images) as string[];
        
        if (Array.isArray(designUrls) && designUrls.length > 0) {
          console.log(`📊 Found ${designUrls.length} design URLs in attributes`);
          
          // Filter to only keep valid URLs
          const validUrls = designUrls.filter(url => 
            typeof url === 'string' && (url.startsWith('http') || url.startsWith('data:'))
          );
          
          // Add properties for each URL
          validUrls.forEach((url, index) => {
            properties.push({
              key: `_Design ${index + 1}`,
              value: url,
            });
          });
          
          // Use the first URL as the primary image if available
          if (validUrls.length > 0) {
            finalImageUrl = validUrls[0];
          }
          
          // If we got URLs from attributes and we're in a server environment,
          // we can skip further storage processing which will likely fail
          if (!isBrowser && validUrls.length > 0) {
            console.log('✓ Using design URLs from attributes in server context');
            return new Response(
              JSON.stringify({
                success: true,
                checkoutImageUrl: finalImageUrl,
                properties,
              }),
              {
                status: 200,
                headers: {'Content-Type': 'application/json'},
              }
            );
          }
        }
      } catch (parseError) {
        console.error('Failed to parse _all_designed_images:', parseError);
        // Continue with normal processing
      }
    }

    // Check for the special _design_cloud_urls attribute
    if (body._design_cloud_urls && typeof body._design_cloud_urls === 'string') {
      // Skip parsing if it's the placeholder value
      if (body._design_cloud_urls === 'STORED_IN_LOCAL_STORAGE') {
        console.log('⚠️ Found placeholder STORED_IN_LOCAL_STORAGE value in _design_cloud_urls - will use other sources');
      } else {
        try {
          const cloudUrls = JSON.parse(body._design_cloud_urls) as string[];
          
          if (Array.isArray(cloudUrls) && cloudUrls.length > 0) {
            console.log(`📊 Found ${cloudUrls.length} design URLs in _design_cloud_urls attribute`);
            
            // Filter to only keep valid URLs
            const validUrls = cloudUrls.filter((url): url is string => 
              typeof url === 'string' && url.startsWith('http')
            );
            
            // Add properties for each URL
            validUrls.forEach((url, index) => {
              properties.push({
                key: `_Design ${index + 1}`,
                value: url,
              });
            });
            
            // Use the first URL as the primary image if available
            if (validUrls.length > 0) {
              finalImageUrl = validUrls[0];
              
              // If in server context, we can return immediately
              if (!isBrowser) {
                console.log('✓ Using design URLs from cloud URLs attribute in server context');
                return new Response(
                  JSON.stringify({
                    success: true,
                    checkoutImageUrl: finalImageUrl,
                    properties,
                  }),
                  {
                    status: 200,
                    headers: {'Content-Type': 'application/json'},
                  }
                );
              }
            }
          }
        } catch (parseError) {
          console.error('Failed to parse _design_cloud_urls:', parseError);
          // Continue with normal processing
        }
      }
    }

    // Special handling for "multi_design" - this is a key for designs stored directly in attributes
    if (imageUrl === 'multi_design' && body._all_designed_images) {
      try {
        // Parse the JSON array of image URLs
        const designUrls = JSON.parse(body._all_designed_images) as string[];
        
        if (Array.isArray(designUrls) && designUrls.length > 0) {
          designUrls.forEach((url, index) => {
            if (typeof url === 'string') {
              properties.push({
                key: `_Design ${index + 1}`,
                value: url,
              });
            }
          });
          
          // Use the first URL as the primary image
          if (typeof designUrls[0] === 'string') {
            finalImageUrl = designUrls[0];
          }
        }
      } catch (error) {
        console.error('Failed to parse _all_designed_images:', error);
        // Continue with normal processing
      }
    }
    // Check if the image is a storage reference
    else if (imageUrl.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
      console.log('🔄 Processing storage reference for checkout:', imageUrl);
      
      // Skip storage retrieval in server context unless it's a cloudinary reference
      if (!isBrowser && !imageUrl.startsWith('cloudinary://')) {
        console.log('⚠️ Skipping storage retrieval in server context');
        
        // Still try to use any available URLs from attributes
        if (body._all_designed_images) {
          try {
            const designUrls = JSON.parse(body._all_designed_images) as string[];
            if (Array.isArray(designUrls) && designUrls.length > 0 && typeof designUrls[0] === 'string') {
              finalImageUrl = designUrls[0];
              console.log(`✓ Using first URL from attributes: ${finalImageUrl}`);
            }
          } catch (e) {
            console.error('Error parsing design URLs in server context:', e);
          }
        }
      } else {
        try {
          // Import storage manager
          const {retrieveData} = await import('~/utils/storageManager');
          
          try {
            // Retrieve the image data
            const imageData = await retrieveData(imageUrl);
            
            if (imageData && typeof imageData === 'string') {
              // If it's a data URL, upload to Cloudinary for Shopify checkout display
              if (imageData.startsWith('data:')) {
                console.log('🌥️ Uploading design image to Cloudinary for checkout display...');
                
                const uploadResult = await uploadCanvasToCloudinary(imageData, {
                  folder: 'checkout_display',
                  filename: `checkout_display_${Date.now()}`,
                });
                
                if (uploadResult.success && uploadResult.url) {
                  console.log('✅ Successfully uploaded design to Cloudinary for checkout display');
                  finalImageUrl = uploadResult.url;
                } else {
                  console.error('Failed to upload design to Cloudinary:', uploadResult.error);
                  // Use the data URL as fallback (though this won't work in checkout)
                  finalImageUrl = imageData;
                }
              } else if (imageData.startsWith('http')) {
                // It's already a URL, use it directly
                finalImageUrl = imageData;
              }
            } else if (imageUrl.startsWith('cloudinary://')) {
              // For cloudinary references, extract the URL
              const cloudinaryUrl = imageUrl.replace('cloudinary://', '');
              if (cloudinaryUrl.startsWith('http')) {
                finalImageUrl = cloudinaryUrl;
              }
            }
          } catch (storageError) {
            // Handle storage retrieval errors gracefully
            console.warn(`Storage retrieval error for ${imageUrl}:`, storageError);
            
            // Try to fallback to Cloudinary if the error is storage-related
            if (designStorageKey && body._all_designed_images) {
              try {
                // Parse the JSON array of image URLs from attributes
                const designUrls = JSON.parse(body._all_designed_images) as string[];
                if (Array.isArray(designUrls) && designUrls.length > 0) {
                  console.log('✅ Fallback to design URLs from attributes');
                  if (typeof designUrls[0] === 'string') {
                    finalImageUrl = designUrls[0];
                  }
                  
                  // Add properties for each URL
                  designUrls.forEach((url, index) => {
                    properties.push({
                      key: `_Design ${index + 1}`,
                      value: url,
                    });
                  });
                }
              } catch (parseError) {
                console.error('Failed to parse fallback image URLs:', parseError);
              }
            }
          }
        } catch (importError) {
          console.error('Failed to import storage manager:', importError);
          // Fall back to using URLs from attributes
          if (body._all_designed_images) {
            try {
              const designUrls = JSON.parse(body._all_designed_images) as string[];
              if (Array.isArray(designUrls) && designUrls.length > 0 && typeof designUrls[0] === 'string') {
                finalImageUrl = designUrls[0];
                console.log(`✓ Using first URL from attributes after import error: ${finalImageUrl}`);
              }
            } catch (e) {
              console.error('Error parsing design URLs after import error:', e);
            }
          }
        }
      }
    } else if (imageUrl.startsWith('http')) {
      // Direct URL, use as is
      finalImageUrl = imageUrl;
    } else if (imageUrl.startsWith('data:')) {
      // It's a base64 image, upload to Cloudinary
      console.log('🌥️ Uploading base64 image to Cloudinary for checkout display...');
      
      const uploadResult = await uploadCanvasToCloudinary(imageUrl, {
        folder: 'checkout_display',
        filename: `checkout_display_${Date.now()}`,
      });
      
      if (uploadResult.success && uploadResult.url) {
        console.log('✅ Successfully uploaded design to Cloudinary for checkout display');
        finalImageUrl = uploadResult.url;
      } else {
        console.error('Failed to upload design to Cloudinary:', uploadResult.error);
        // Use the data URL as fallback
        finalImageUrl = imageUrl;
      }
    }

    // For multi-design products, handle differently
    if (designType === 'multi' && designStorageKey) {
      // First check if we have all_designed_images in the body - this is a direct fallback
      if (body._all_designed_images) {
        try {
          const parsedUrls = JSON.parse(body._all_designed_images) as string[];
          if (Array.isArray(parsedUrls) && parsedUrls.length > 0) {
            console.log('Using direct image URLs from attributes');
            
            // Ensure all URLs are valid and upload to Cloudinary if they're not already there
            const processedUrls: string[] = [];
            
            for (let i = 0; i < parsedUrls.length; i++) {
              const designUrl = parsedUrls[i];
              if (typeof designUrl === 'string') {
                if (designUrl.startsWith('http')) {
                  // Check if this is already a Cloudinary URL
                  if (designUrl.includes('cloudinary.com')) {
                    console.log(`URL ${i} is already a Cloudinary URL, using as is`);
                    processedUrls.push(designUrl);
                    
                    // Add to properties collection
                    properties.push({
                      key: `_Design ${i + 1}`,
                      value: designUrl,
                    });
                  } else {
                    // Not a Cloudinary URL, upload for permanence
                    console.log(`Uploading design ${i} to Cloudinary for checkout...`);
                    try {
                      const uploadResult = await uploadCanvasToCloudinary(designUrl, {
                        folder: 'checkout_display',
                        filename: `checkout_design_${i}_${Date.now()}`,
                      });
                      
                      if (uploadResult.success && uploadResult.url) {
                        processedUrls.push(uploadResult.url);
                        
                        // Add to properties collection
                        properties.push({
                          key: `_Design ${i + 1}`,
                          value: uploadResult.url,
                        });
                      } else {
                        // Use original if upload fails
                        processedUrls.push(designUrl);
                        
                        properties.push({
                          key: `_Design ${i + 1}`,
                          value: designUrl,
                        });
                      }
                    } catch (uploadError) {
                      console.error(`Failed to upload design ${i}:`, uploadError);
                      // Use original URL on error
                      processedUrls.push(designUrl);
                      
                      properties.push({
                        key: `_Design ${i + 1}`,
                        value: designUrl,
                      });
                    }
                  }
                }
              }
            }
            
            // Use the first URL as the primary image if we haven't set it yet
            if (finalImageUrl === imageUrl && processedUrls.length > 0) {
              finalImageUrl = processedUrls[0];
            }
            
            // In server context, we can skip storage retrieval entirely
            if (!isBrowser) {
              console.log('✓ Using design URLs from attributes for multi-design in server context');
              
              // Always ensure we have the basic custom design properties
              const hasCustomDesignProp = properties.some(p => p.key === '_Custom Design');
              const hasDesignImageProp = properties.some(p => p.key === '_Design Image');
              
              if (!hasCustomDesignProp) {
                properties.push({
                  key: '_Custom Design',
                  value: 'Yes',
                });
              }
              
              if (!hasDesignImageProp && finalImageUrl) {
                properties.push({
                  key: '_Design Image',
                  value: finalImageUrl,
                });
              }
              
              return new Response(
                JSON.stringify({
                  success: true,
                  checkoutImageUrl: finalImageUrl,
                  properties,
                }),
                {
                  status: 200,
                  headers: {'Content-Type': 'application/json'},
                }
              );
            }
          }
        } catch (parseError) {
          console.error('Failed to parse _all_designed_images:', parseError);
          // Continue with storage retrieval if in browser context
        }
      }
      
      // Check for backup design image URL
      const backupImageUrl = body._design_image_url_backup;
      if (backupImageUrl && typeof backupImageUrl === 'string' && backupImageUrl.startsWith('http')) {
        console.log('Found backup design image URL:', backupImageUrl);
        
        // Use backup directly
        finalImageUrl = backupImageUrl;
        
        // Add as a design property
        properties.push({
          key: '_Design 1',
          value: backupImageUrl,
        });
        
        properties.push({
          key: '_Design Image',
          value: backupImageUrl,
        });
        
        // If in server context, we can return immediately
        if (!isBrowser) {
          properties.push({
            key: '_Custom Design',
            value: 'Yes',
          });
          
          return new Response(
            JSON.stringify({
              success: true,
              checkoutImageUrl: finalImageUrl,
              properties,
            }),
            {
              status: 200,
              headers: {'Content-Type': 'application/json'},
            }
          );
        }
      }
      
      // Check if we have a customized image as another fallback
      if (body._customized_image && typeof body._customized_image === 'string' && 
          body._customized_image.startsWith('http')) {
        console.log('Found customized base image as fallback:', body._customized_image.substring(0, 50));
        
        // Upload to Cloudinary if not already there
        if (!body._customized_image.includes('cloudinary.com')) {
          try {
            const uploadResult = await uploadCanvasToCloudinary(body._customized_image, {
              folder: 'checkout_display',
              filename: `checkout_customized_base_${Date.now()}`,
            });
            
            if (uploadResult.success && uploadResult.url) {
              console.log('✅ Uploaded customized base image to Cloudinary as fallback');
              
              // Use as fallback
              if (finalImageUrl === imageUrl) {
                finalImageUrl = uploadResult.url;
              }
              
              // Add to properties
              if (!properties.some(p => p.key === '_Design 1')) {
                properties.push({
                  key: '_Design 1',
                  value: uploadResult.url,
                });
              }
              
              if (!properties.some(p => p.key === '_Design Image')) {
                properties.push({
                  key: '_Design Image',
                  value: uploadResult.url,
                });
              }
              
              // If in server context, return immediately
              if (!isBrowser) {
                properties.push({
                  key: '_Custom Design',
                  value: 'Yes',
                });
                
                return new Response(
                  JSON.stringify({
                    success: true,
                    checkoutImageUrl: finalImageUrl,
                    properties,
                  }),
                  {
                    status: 200,
                    headers: {'Content-Type': 'application/json'},
                  }
                );
              }
            }
          } catch (uploadError) {
            console.error('Failed to upload customized base image:', uploadError);
            
            // Still use original URL
            if (finalImageUrl === imageUrl) {
              finalImageUrl = body._customized_image;
            }
            
            // Add to properties
            if (!properties.some(p => p.key === '_Design 1')) {
              properties.push({
                key: '_Design 1',
                value: body._customized_image,
              });
            }
            
            if (!properties.some(p => p.key === '_Design Image')) {
              properties.push({
                key: '_Design Image',
                value: body._customized_image,
              });
            }
          }
        } else {
          // Already a cloudinary URL
          if (finalImageUrl === imageUrl) {
            finalImageUrl = body._customized_image;
          }
          
          // Add to properties
          if (!properties.some(p => p.key === '_Design 1')) {
            properties.push({
              key: '_Design 1',
              value: body._customized_image,
            });
          }
          
          if (!properties.some(p => p.key === '_Design Image')) {
            properties.push({
              key: '_Design Image',
              value: body._customized_image,
            });
          }
        }
      }
      
      // Skip storage retrieval in server context
      if (!isBrowser) {
        console.log('⚠️ Skipping multi-design storage retrieval in server context');
        
        // Just use what we have so far
        // Always ensure we have the basic custom design properties
        const hasCustomDesignProp = properties.some(p => p.key === '_Custom Design');
        const hasDesignImageProp = properties.some(p => p.key === '_Design Image');
        
        if (!hasCustomDesignProp) {
          properties.push({
            key: '_Custom Design',
            value: 'Yes',
          });
        }
        
        if (!hasDesignImageProp && finalImageUrl) {
          properties.push({
            key: '_Design Image',
            value: finalImageUrl,
          });
        }
        
        return new Response(
          JSON.stringify({
            success: true,
            checkoutImageUrl: finalImageUrl,
            properties,
          }),
          {
            status: 200,
            headers: {'Content-Type': 'application/json'},
          }
        );
      }
    }

    // Always ensure we have the basic custom design properties
    // If the properties array doesn't already have these keys
    const hasCustomDesignProp = properties.some(p => p.key === '_Custom Design');
    const hasDesignImageProp = properties.some(p => p.key === '_Design Image');
    
    if (!hasCustomDesignProp) {
      properties.push({
        key: '_Custom Design',
        value: 'Yes',
      });
    }
    
    if (!hasDesignImageProp && finalImageUrl) {
      properties.push({
        key: '_Design Image',
        value: finalImageUrl,
      });
    }

    // Return the image URL and properties
    return new Response(
      JSON.stringify({
        success: true,
        checkoutImageUrl: finalImageUrl,
        properties,
      }),
      {
        status: 200,
        headers: {'Content-Type': 'application/json'},
      }
    );
  } catch (error) {
    console.error('Error preparing cart line properties:', error);
    
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
} 