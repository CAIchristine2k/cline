import {CartForm, Image} from '@shopify/hydrogen';
import {Money} from '~/components/Money';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';
import type {CartLineFragment} from 'storefrontapi.generated';
import type {CartLayout} from './CartMain';
import {Trash2, Plus, Minus} from 'lucide-react';
import {useEffect, useState} from 'react';
import {getCartLineDesigns} from '~/utils/designStorage';

/**
 * Modern cart line item with clean design and proper theme integration.
 * Features glass morphism effects and improved button visibility.
 */
export function CartLineItem({
  line,
  layout = 'aside',
}: {
  line: CartLineFragment & {isOptimistic?: boolean};
  layout: CartLayout;
}) {
  const config = useConfig();
  const {id, merchandise, quantity, attributes} = line;

  // Add safety checks for merchandise and product data
  if (!merchandise || !merchandise.product) {
    return null;
  }

  const {product, title, image, selectedOptions} = merchandise;
  const isGiftCard = product.handle === 'gift-card';
  const lineItemUrl = `/products/${product.handle}`;

  // Find the custom design attributes for this line item (with null safety)
  const lineAttributes = line.attributes || [];
  
  const customDesignImage = lineAttributes.find(
    (attr) => attr.key === '_design_image_url' || attr.key === '_checkout_image' || attr.key === '_checkout_display_image',
  )?.value;

  const isCustomDesign =
    lineAttributes.find(
      (attr) => attr.key === '_custom_design'
    )?.value === 'true' || 
    lineAttributes.find(
      (attr) => attr.key === '_checkout_image_prepared'
    )?.value === 'true';

  const customizedImage = lineAttributes.find(
    (attr) => attr.key === '_customized_image' || attr.key === '_checkout_display_image',
  )?.value;
  
  // Look for designs in multiple locations
  const allDesignedImagesAttr = lineAttributes.find(
    (attr) => attr.key === '_all_designed_images',
  )?.value;

  const designCloudUrls = lineAttributes.find(
    (attr) => attr.key === '_design_cloud_urls',
  )?.value;
  
  const designStorageKey = lineAttributes.find(
    (attr) => attr.key === '_design_storage_key',
  )?.value;
  
  // State to store local design images
  const [localDesignUrl, setLocalDesignUrl] = useState<string | null>(null);
  
  // Parse cloud URLs if available
  const [cloudUrls, setCloudUrls] = useState<string[]>([]);
  
  // Add loading state with timeout
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingTimedOut, setLoadingTimedOut] = useState<boolean>(false);
  
  // Handle loading timeout - after 3 seconds, stop showing loading indicator
  useEffect(() => {
    if (isLoading) {
      const timeoutId = setTimeout(() => {
        setLoadingTimedOut(true);
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);
  
  // First, parse _all_designed_images, as this is the most reliable source
  useEffect(() => {
    if (allDesignedImagesAttr && typeof allDesignedImagesAttr === 'string') {
      try {
        const parsedImages = JSON.parse(allDesignedImagesAttr);
        if (Array.isArray(parsedImages) && parsedImages.length > 0) {
          const validUrls = parsedImages.filter((url): url is string => 
            typeof url === 'string' && url.startsWith('http')
          );
          
          if (validUrls.length > 0) {
            // Use the first image URL directly
            setLocalDesignUrl(validUrls[0]);
            setIsLoading(false);
            
            // Also cache all URLs
            setCloudUrls(validUrls);
            return;
          }
        }
      } catch (e) {
        // Failed to parse
      }
    }
  }, [allDesignedImagesAttr]);
  
  // Next, try to parse _design_cloud_urls if we haven't found an image yet
  useEffect(() => {
    if (!localDesignUrl && designCloudUrls && typeof designCloudUrls === 'string') {
      // Skip parsing if the value is "STORED_IN_LOCAL_STORAGE", this is a marker, not actual JSON
      if (designCloudUrls === 'STORED_IN_LOCAL_STORAGE') {
        // Skip parsing and try the next method
      } else {
        try {
          const parsed = JSON.parse(designCloudUrls);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validUrls = parsed.filter((url): url is string => 
              typeof url === 'string' && url.startsWith('http')
            );
            
            if (validUrls.length > 0) {
              setLocalDesignUrl(validUrls[0]);
              setIsLoading(false);
              setCloudUrls(validUrls);
              return;
            }
          }
        } catch (e) {
          // Failed to parse
        }
      }
    }
  }, [designCloudUrls, localDesignUrl]);
  
  // Special handling for customizedImage URL
  useEffect(() => {
    if (!localDesignUrl && customizedImage && typeof customizedImage === 'string' && customizedImage.startsWith('http')) {
      setLocalDesignUrl(customizedImage);
      setIsLoading(false);
      return;
    }
  }, [customizedImage, localDesignUrl]);

  // If we still don't have a design URL and the loading has timed out, mark as not loading
  useEffect(() => {
    if (loadingTimedOut) {
      setIsLoading(false);
    }
  }, [loadingTimedOut]);
  
  // Effect to load designs using the smart storage manager - lowest priority but still try
  useEffect(() => {
    // Only run this if we don't already have a URL from attributes
    if (isCustomDesign && !localDesignUrl) {
      async function loadDesignImage() {
        try {
          // First check if we have cloud URLs available from previous parsing
          if (cloudUrls.length > 0) {
            setLocalDesignUrl(cloudUrls[0]);
            setIsLoading(false);
            return;
          }

          // Import the storage manager
          const { retrieveData } = await import('~/utils/storageManager');
          
          // First check if the customDesignImage itself is a storage reference
          if (isCustomDesign && customDesignImage) {
            // If it's already a URL, use it directly
            if (customDesignImage.startsWith('http')) {
              setLocalDesignUrl(customDesignImage);
              setIsLoading(false);
              return;
            }

            // Check if it's a storage reference (storageType://key)
            if (customDesignImage.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
              // Try to retrieve the design from the appropriate storage
              const imageData = await retrieveData(customDesignImage);

              if (imageData) {
                setLocalDesignUrl(imageData);
                setIsLoading(false);
                return;
              } else {
                // If the reference is a cloudinary URL, we can use it directly
                if (customDesignImage.startsWith('cloudinary://')) {
                  const cloudinaryUrl = customDesignImage.replace('cloudinary://', '');
                  if (cloudinaryUrl.startsWith('http')) {
                    setLocalDesignUrl(cloudinaryUrl);
                    setIsLoading(false);
                    return;
                  }
                }
              }
            }
          }
          
          // Then check multi-design storage
          if (isCustomDesign && designStorageKey) {
            try {
              // Get the design URLs from localStorage
              const storedDesigns = localStorage.getItem(designStorageKey);
              
              if (storedDesigns) {
                // Parse with proper typing
                const designUrls = JSON.parse(storedDesigns) as Record<string, string>;
                
                // If we have customizedImage, use it as a key to find the right design
                if (customizedImage && designUrls[customizedImage]) {
                  const designRef = designUrls[customizedImage];
                  
                  // Check if this is a storage reference
                  if (designRef.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
                    // Retrieve from appropriate storage
                    const imageData = await retrieveData(designRef);

                    if (imageData) {
                      setLocalDesignUrl(imageData);
                      setIsLoading(false);
                      return;
                    } else if (designRef.startsWith('cloudinary://')) {
                      // For cloudinary, the key might actually be the URL
                      const cloudinaryUrl = designRef.replace('cloudinary://', '');
                      if (cloudinaryUrl.startsWith('http')) {
                        setLocalDesignUrl(cloudinaryUrl);
                        setIsLoading(false);
                        return;
                      }
                    }
                  } else if (designRef.startsWith('http')) {
                    // It's a direct URL
                    setLocalDesignUrl(designRef);
                    setIsLoading(false);
                    return;
                  }
                } else if (Object.keys(designUrls).length > 0) {
                  // Otherwise, just use the first design
                  const firstKey = Object.keys(designUrls)[0];
                  const designRef = designUrls[firstKey];
                  
                  // Same logic as above for storage references
                  if (designRef.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
                    const imageData = await retrieveData(designRef);

                    if (imageData) {
                      setLocalDesignUrl(imageData);
                      setIsLoading(false);
                      return;
                    } else if (designRef.startsWith('cloudinary://')) {
                      // For cloudinary, the key might actually be the URL
                      const cloudinaryUrl = designRef.replace('cloudinary://', '');
                      if (cloudinaryUrl.startsWith('http')) {
                        setLocalDesignUrl(cloudinaryUrl);
                        setIsLoading(false);
                        return;
                      }
                    }
                  } else if (designRef.startsWith('http')) {
                    // It's a direct URL
                    setLocalDesignUrl(designRef);
                    setIsLoading(false);
                    return;
                  }
                }
              }
            } catch (storageError) {
              // Error accessing storage
            }
          }
          
          // If we reach here, we've tried everything but still failed
          // Mark loading as complete and let the UI show a fallback
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          // If storage fails, just use the fallback image
          if (customizedImage) {
            setLocalDesignUrl(customizedImage);
          }
        }
      }
      
      // Call the async function
      loadDesignImage();
    }
  }, [isCustomDesign, customDesignImage, designStorageKey, customizedImage, cloudUrls, localDesignUrl]);

  // Check localStorage for design URLs
  useEffect(() => {
    if (isCustomDesign && !localDesignUrl) {
      // Extract line ID from the Shopify cart line ID
      const lineIdMatch = line.id?.match(/gid:\/\/shopify\/CartLine\/([^?]+)/);
      const lineId = lineIdMatch ? lineIdMatch[1] : null;
      
      if (lineId) {
        // First check our new direct localStorage key
        try {
          const storageKey = `cart-line-design-${lineId}`;
          const storedDesign = localStorage.getItem(storageKey);
          
          if (storedDesign && storedDesign.startsWith('http')) {
            setLocalDesignUrl(storedDesign);
            return;
          }
        } catch (e) {
          // Error accessing storage
        }
        
        // Then try our structured storage
        const persistedDesigns = getCartLineDesigns(lineId);

        if (persistedDesigns.length > 0) {
          setLocalDesignUrl(persistedDesigns[0]);
        } else {
          // Also try with temp IDs (look at all stored designs)
          const tempDesigns = getCartLineDesigns('temp-latest');
          if (tempDesigns.length > 0) {
            setLocalDesignUrl(tempDesigns[0]);
          }
        }
      }
    }
  }, [line.id, isCustomDesign, localDesignUrl]);

  // Determine what image to display - ALWAYS use featured image for ALL products
  // PRIORITÉ ABSOLUE: product.featuredImage (photo principale définie dans Shopify)
  let displayImageUrl = product?.featuredImage?.url || merchandise?.image?.url || '';
  let displayImageType = 'FEATURED_IMAGE';

  // For custom designs, use the local design URL if available
  if (isCustomDesign && localDesignUrl) {
    if (localDesignUrl.startsWith('data:') || localDesignUrl.startsWith('http')) {
      displayImageUrl = localDesignUrl;
      displayImageType = 'CUSTOM_DESIGN';
    }
  }

  // Prioritize displaying custom designs
  if (isCustomDesign) {
    // Priority 1: Local design URL from localStorage/storage
    if (localDesignUrl) {
      displayImageUrl = localDesignUrl;
      displayImageType = 'CUSTOM_DESIGN';
    }
    // Priority 2: Direct design image from cart attributes
    else if (customDesignImage) {
      if (customDesignImage.startsWith('http')) {
        displayImageUrl = customDesignImage;
        displayImageType = 'CUSTOM_DESIGN';
      } else if (customDesignImage.startsWith('data:image')) {
        displayImageUrl = customDesignImage;
        displayImageType = 'CUSTOM_DESIGN';
      } else if (customDesignImage === 'multi_design') {
        // When it's a multi-design product, look for a URL in allDesignedImagesAttr
        if (allDesignedImagesAttr && typeof allDesignedImagesAttr === 'string') {
          try {
            const imageUrls = JSON.parse(allDesignedImagesAttr);
            if (Array.isArray(imageUrls) && imageUrls.length > 0 &&
                typeof imageUrls[0] === 'string' && imageUrls[0].startsWith('http')) {
              displayImageUrl = imageUrls[0];
              displayImageType = 'MULTI_DESIGN';
            }
          } catch (e) {
            // Error parsing
          }
        }

        // If still no URL, use customizedImage as fallback
        if (displayImageType !== 'MULTI_DESIGN' && customizedImage && customizedImage.startsWith('http')) {
          displayImageUrl = customizedImage;
          displayImageType = 'CUSTOMIZED_BASE';
        }
      }
    }
    // Priority 3: Customized base image
    else if (customizedImage && customizedImage.startsWith('http')) {
      displayImageUrl = customizedImage;
      displayImageType = 'CUSTOMIZED_BASE';
    }
    // Fallback: Product featured image with custom design indicator
    else if (product?.featuredImage?.url) {
      displayImageUrl = product.featuredImage.url;
      displayImageType = isLoading ? 'LOADING_DESIGN' : 'VARIANT_WITH_CUSTOM_LABEL';
    }
    // Last fallback: Variant image
    else if (merchandise?.image?.url) {
      displayImageUrl = merchandise.image.url;
      displayImageType = isLoading ? 'LOADING_DESIGN' : 'VARIANT_WITH_CUSTOM_LABEL';
    }
  } else {
    // Standard product without customization - ALWAYS use featured image (photo principale Shopify)
    displayImageUrl = product?.featuredImage?.url || merchandise?.image?.url || '';
    displayImageType = 'FEATURED';
  }

  // VÉRIFICATION FINALE: Si on n'a toujours pas d'image et qu'on a product.featuredImage, l'utiliser
  if (!displayImageUrl && product?.featuredImage?.url) {
    displayImageUrl = product.featuredImage.url;
    displayImageType = 'FEATURED_FALLBACK';
  }

  return (
    <div className="cart-line-item group" style={{backgroundColor: '#faa3ae'}}>
      <div className="flex items-start gap-3">
        {/* Product Image - Slightly smaller for more text space */}
        <div className="relative flex-shrink-0">
          <Link to={lineItemUrl} prefetch="intent" className="block">
            <div className="group w-[90px] h-[90px] overflow-hidden bg-black rounded-md flex items-center justify-center">
              {displayImageUrl ? (
                <img
                  src={displayImageUrl}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  alt={`Custom ${title || product.title || 'Product design'}`}
                  onError={(e) => {
                    // If the custom design image fails to load, try using cloudUrls first
                    if (cloudUrls.length > 0 && cloudUrls[0] !== displayImageUrl) {
                      (e.target as HTMLImageElement).src = cloudUrls[0];
                    }
                    // Try all_designed_images next
                    else if (allDesignedImagesAttr) {
                      try {
                        const imageUrls = JSON.parse(allDesignedImagesAttr);
                        if (Array.isArray(imageUrls) && imageUrls.length > 0 &&
                            typeof imageUrls[0] === 'string' && imageUrls[0].startsWith('http')) {
                          (e.target as HTMLImageElement).src = imageUrls[0];
                        }
                      } catch {}
                    }
                    // Else try the customized base image
                    else if (customizedImage && customizedImage.startsWith('http')) {
                      (e.target as HTMLImageElement).src = customizedImage;
                    }
                    // Last resort: fall back to the featured image, then variant image if available
                    else if (product?.featuredImage?.url) {
                      (e.target as HTMLImageElement).src = product.featuredImage.url;
                    }
                    else if (merchandise?.image?.url) {
                      (e.target as HTMLImageElement).src = merchandise.image.url;
                    }
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 text-xs font-medium">
                  No Image
                </div>
              )}
            </div>
          </Link>

          {/* Optimistic state indicator */}
          {line.isOptimistic && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
          )}

          {/* Custom design indicator */}
          {(displayImageType === 'CUSTOM_DESIGN' || 
            displayImageType === 'CUSTOMIZED_BASE' || 
            displayImageType === 'MULTI_DESIGN' ||
            displayImageType === 'LOADING_DESIGN' ||
            displayImageType === 'VARIANT_WITH_CUSTOM_LABEL') && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🎨</span>
            </div>
          )}
        </div>

        {/* Product Details - Expanded space */}
        <div className="flex-grow min-w-0">
          <div className="space-y-1">
            {/* Product Title */}
            <Link
              to={lineItemUrl}
              prefetch="intent"
              className="block group/title"
            >
              <h3 className="font-semibold text-black text-sm leading-tight group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
                {product.title || 'Untitled Product'}
              </h3>
            </Link>

            {/* Product Description */}
            {product.description && (
              <p className="text-black/50 text-xs leading-relaxed line-clamp-2 mt-1">
                {product.description}
              </p>
            )}

            {/* Variant Details */}
            {title && title !== 'Default Title' && (
              <p className="text-black/60 text-xs font-medium">{title}</p>
            )}

            {/* Selected Options */}
            {selectedOptions &&
              selectedOptions.length > 0 &&
              selectedOptions[0]?.value !== 'Default Title' && (
                <div className="flex flex-wrap gap-2 items-center">
                  {selectedOptions.map((option) => {
                    // Check if this is a color option
                    const isColorOption =
                      option.name.toLowerCase() === 'couleur' ||
                      option.name.toLowerCase() === 'color' ||
                      option.name.toLowerCase() === 'colours';

                    // For color options, display a swatch with the color metaobject image
                    if (isColorOption) {
                      // Try to get the color swatch image from attributes first
                      const colorSwatchImage = lineAttributes.find(
                        (attr) => attr.key === '_color_swatch_image'
                      )?.value;

                      // Use the color swatch image if available, otherwise fallback to variant image
                      const swatchImageUrl = colorSwatchImage || merchandise?.image?.url;

                      if (swatchImageUrl) {
                        return (
                          <div
                            key={option.name}
                            className="rounded-full w-7 h-7 border-2 border-black/20 overflow-hidden flex items-center justify-center bg-transparent"
                            aria-label={`Couleur sélectionnée: ${option.value}`}
                            title={option.value}
                          >
                            <img
                              src={swatchImageUrl}
                              alt={option.value}
                              className="w-full h-full object-cover"
                              style={{ minWidth: '100%', minHeight: '100%' }}
                            />
                          </div>
                        );
                      }
                    }

                    // For non-color options or if no image, display text tag
                    return (
                      <span
                        key={option.name}
                        className="inline-flex items-center px-2 py-0.5 rounded-md bg-black/5 border border-black/10 text-black/70 text-xs font-medium"
                      >
                        {option.value}
                      </span>
                    );
                  })}
                </div>
              )}

            {/* Custom Design Badge */}
            {/* {isCustomDesign && (
              <div className="flex items-center gap-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                  displayImageType === 'CUSTOM_DESIGN' || displayImageType === 'MULTI_DESIGN'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                    : displayImageType === 'CUSTOMIZED_BASE' 
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                      : displayImageType === 'LOADING_DESIGN' && !loadingTimedOut
                        ? 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
                        : 'bg-red-500/20 border border-red-500/30 text-red-300'
                }`}>
                  {displayImageType === 'CUSTOM_DESIGN' || displayImageType === 'MULTI_DESIGN'
                    ? '🎨 Your Custom Design' 
                    : displayImageType === 'CUSTOMIZED_BASE' 
                      ? '🎨 Customized Design'
                      : displayImageType === 'LOADING_DESIGN' && !loadingTimedOut
                        ? '🔄 Loading Design...'
                        : '🎨 Custom Design'}
                </span>
                {displayImageType === 'LOADING_DESIGN' && !loadingTimedOut && (
                  <div className="animate-pulse w-4 h-4 bg-yellow-500/30 rounded-full"></div>
                )}
              </div>
            )} */}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {merchandise.price ? (
                <Money
                  data={merchandise.price}
                  className="text-black font-bold text-sm"
                />
              ) : (
                <span className="text-black font-bold text-sm">
                  Price unavailable
                </span>
              )}
              {merchandise.compareAtPrice && (
                <Money
                  data={merchandise.compareAtPrice}
                  className="text-black/40 line-through text-xs"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions Row - Compact */}
      <div className="flex items-center justify-between mt-3">
        <CartLineQuantityAdjust line={line} />
        <CartLineRemoveButton lineId={id} disabled={!!line.isOptimistic} />
      </div>
    </div>
  );
}

/**
 * Modern quantity adjustment controls with better visibility and design.
 */
function CartLineQuantityAdjust({
  line,
}: {
  line: CartLineFragment & {isOptimistic?: boolean};
}) {
  if (!line || typeof line?.quantity === 'undefined') return null;

  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center gap-1">
      {/* Decrease button */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{lines: [{id: lineId, quantity: prevQuantity}]}}
      >
        <button
          type="submit"
          name="decrease-quantity"
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!line.isOptimistic}
          className="w-8 h-8 rounded-lg bg-black/10 backdrop-blur-sm border border-white flex items-center justify-center transition-all duration-200 hover:bg-black/20 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/10 disabled:hover:border-white"
        >
          <Minus className="w-4 h-4 text-black" />
        </button>
      </CartForm>

      {/* Quantity display */}
      <div className="min-w-[3rem] px-3 py-2 bg-black/5 backdrop-blur-sm border border-white rounded-lg text-center">
        <span className="text-black font-semibold text-sm">{quantity}</span>
      </div>

      {/* Increase button */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{lines: [{id: lineId, quantity: nextQuantity}]}}
      >
        <button
          type="submit"
          name="increase-quantity"
          aria-label="Increase quantity"
          disabled={!!line.isOptimistic}
          className="w-8 h-8 rounded-lg bg-black/10 backdrop-blur-sm border border-white flex items-center justify-center transition-all duration-200 hover:bg-black/20 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/10 disabled:hover:border-white"
        >
          <Plus className="w-4 h-4 text-black" />
        </button>
      </CartForm>
    </div>
  );
}

/**
 * Modern remove button with improved design and hover effects.
 */
function CartLineRemoveButton({
  lineId,
  disabled = false,
}: {
  lineId: string;
  disabled?: boolean;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds: [lineId]}}
    >
      <button
        type="submit"
        className="group/remove w-8 h-8 rounded-lg bg-black/10 backdrop-blur-sm border border-black/20 flex items-center justify-center transition-all duration-200 hover:bg-black/20 hover:border-black/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/10 disabled:hover:border-black/20"
        disabled={disabled}
        aria-label="Remove from cart"
      >
        <Trash2 className="w-4 h-4 text-black/70 group-hover/remove:text-black transition-colors duration-200" />
      </button>
    </CartForm>
  );
}
