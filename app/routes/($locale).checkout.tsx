import React, {useState, useEffect, useCallback} from 'react';
import {useLoaderData, Link, Form, redirect} from 'react-router';
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from 'react-router';
import {CartForm, Image, Money} from '@shopify/hydrogen';
import {useConfig} from '~/utils/themeContext';
import type {CartApiQueryFragment, CartLineFragment} from 'storefrontapi.generated';
import {Truck, Shield, CreditCard, ArrowLeft, ExternalLink} from 'lucide-react';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';

interface LoaderData {
  cart: CartApiQueryFragment;
  checkoutDomain: string;
}

export const meta: MetaFunction = () => {
  return [
    {title: 'Checkout'},
    {
      property: 'og:title',
      content: 'Secure Checkout',
    },
    {
      name: 'description',
      content: 'Complete your purchase securely with Shopify Pay',
    },
  ];
};

export async function loader({context}: LoaderFunctionArgs) {
  const {cart: cartHandler} = context;
  const cartData = await cartHandler.get();

  if (!cartData || !cartData.lines?.nodes?.length) {
    return redirect('/cart');
  }

  return {
    cart: cartData,
    checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN || 'https://shop.app'
  };
}

/**
 * CheckoutLineItem component that properly displays custom designs
 * using the same storage manager as CartLineItem for consistency
 */
function CheckoutLineItem({line}: {line: CartLineFragment}) {
  const {merchandise, quantity, attributes} = line;
  
  // Find the custom design attributes for this line item
  const customDesignImage = attributes?.find(
    (attr) => attr.key === '_design_image_url',
  )?.value;

  const isCustomDesign = attributes?.some(
    (attr) => attr.key === '_custom_design' && attr.value === 'true',
  );

  const customizedImage = attributes?.find(
    (attr) => attr.key === '_customized_image',
  )?.value;

  const designStorageKey = attributes?.find(
    (attr) => attr.key === '_design_storage_key',
  )?.value;
  
  // State to store local design images
  const [localDesignUrl, setLocalDesignUrl] = useState<string | null>(null);
  const [imageLoadAttempted, setImageLoadAttempted] = useState(false);
  
  // Debug log all attributes and design info
  console.log(`🔍 [Checkout] CheckoutLineItem Debug for ${merchandise?.product?.title}:`, {
    lineId: line.id,
    isCustomDesign,
    customDesignImage: customDesignImage ? `${customDesignImage.substring(0, 50)}...` : 'NONE',
    customizedImage: customizedImage ? `${customizedImage.substring(0, 50)}...` : 'NONE',
    designStorageKey,
    allAttributes: attributes,
    localDesignUrl: localDesignUrl ? `${localDesignUrl.substring(0, 50)}...` : 'NONE',
    imageLoadAttempted,
  });
  
  // Effect to load designs using the smart storage manager
  useEffect(() => {
    if (!isCustomDesign || imageLoadAttempted) {
      return;
    }

    // Helper function to process design references
    async function processDesignReference(designRef: string, retrieveData: any): Promise<string | null> {
      if (designRef.startsWith('http')) {
        return designRef;
      } else if (designRef.startsWith('data:image')) {
        return designRef;
      } else if (designRef.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
        const imageData = await retrieveData(designRef);
        if (imageData && typeof imageData === 'string') {
          return imageData;
        } else if (designRef.startsWith('cloudinary://')) {
          const cloudinaryUrl = designRef.replace('cloudinary://', '');
          if (cloudinaryUrl.startsWith('http')) {
            return cloudinaryUrl;
          }
        }
      }
      return null;
    }

    async function loadDesignImage() {
      setImageLoadAttempted(true);
      console.log('🎯 [Checkout] Starting design image load for:', merchandise?.product?.title);
      
      try {
        // Import the storage manager
        const { retrieveData } = await import('~/utils/storageManager');
        
        // Strategy 1: Check if customDesignImage is a direct URL (http/https)
        if (customDesignImage?.startsWith('http')) {
          console.log('🌐 [Checkout] Using direct URL from customDesignImage');
          setLocalDesignUrl(customDesignImage);
          return;
        }
        
        // Strategy 2: Check if customDesignImage is a base64 data URL
        if (customDesignImage?.startsWith('data:image')) {
          console.log('📸 [Checkout] Using base64 data URL from customDesignImage');
          setLocalDesignUrl(customDesignImage);
          return;
        }
        
        // Strategy 3: Check if customDesignImage is a storage reference
        if (customDesignImage?.match(/^(localStorage|indexedDB|cloudinary):\/\//)) {
          console.log('🔍 [Checkout] Found storage reference:', customDesignImage);
          
          // Try to retrieve the design from the appropriate storage
          const imageData = await retrieveData(customDesignImage);
          
          if (imageData && typeof imageData === 'string') {
            console.log('✅ [Checkout] Successfully retrieved design from storage');
            setLocalDesignUrl(imageData);
            return;
          } else {
            console.warn('❌ [Checkout] Design not found in storage:', customDesignImage);
            // If the reference is a cloudinary URL, we can use it directly
            if (customDesignImage.startsWith('cloudinary://')) {
              const cloudinaryUrl = customDesignImage.replace('cloudinary://', '');
              if (cloudinaryUrl.startsWith('http')) {
                console.log('🌥️ [Checkout] Using cloudinary URL directly');
                setLocalDesignUrl(cloudinaryUrl);
                return;
              }
            }
          }
        }
        
        // Strategy 4: Check multi-design storage using designStorageKey
        if (designStorageKey) {
          console.log('📦 [Checkout] Checking multi-design storage with key:', designStorageKey);
          
          try {
            // Get the design URLs from IndexedDB first, then localStorage
            let storedDesigns = await retrieveData(`indexedDB://${designStorageKey}`);
            
            if (!storedDesigns) {
              console.log('🔄 [Checkout] IndexedDB storage empty, trying localStorage');
              storedDesigns = localStorage.getItem(designStorageKey);
            }
            
            if (storedDesigns && typeof storedDesigns === 'string') {
              // Parse with proper typing
              const designUrls = JSON.parse(storedDesigns) as Record<string, string>;
              console.log('📦 [Checkout] Retrieved design URLs from storage:', designUrls);
              
              // If we have customizedImage, use it as a key to find the right design
              if (customizedImage && designUrls[customizedImage]) {
                const designRef = designUrls[customizedImage];
                console.log('🎯 [Checkout] Found design for customized image:', designRef);
                
                // Process the design reference
                const processedUrl = await processDesignReference(designRef, retrieveData);
                if (processedUrl) {
                  setLocalDesignUrl(processedUrl);
                  return;
                }
              } else if (Object.keys(designUrls).length > 0) {
                // Otherwise, just use the first design
                const firstKey = Object.keys(designUrls)[0];
                const designRef = designUrls[firstKey];
                console.log('🎯 [Checkout] Using first design found:', designRef);
                
                const processedUrl = await processDesignReference(designRef, retrieveData);
                if (processedUrl) {
                  setLocalDesignUrl(processedUrl);
                  return;
                }
              }
            }
          } catch (parseError) {
            console.error('[Checkout] Error parsing stored designs:', parseError);
          }
        }
        
        // Strategy 5: Fallback to customizedImage if it's a URL
        if (customizedImage?.startsWith('http')) {
          console.log('🔄 [Checkout] Falling back to customizedImage URL');
          setLocalDesignUrl(customizedImage);
          return;
        }
        
        console.warn('❌ [Checkout] No design image found, will use product image');
        
      } catch (error) {
        console.error('[Checkout] Error loading design image:', error);
      }
    }
    
    loadDesignImage();
  }, [isCustomDesign, customDesignImage, designStorageKey, customizedImage, imageLoadAttempted, merchandise?.product?.title]);

  // Determine what image to display - prioritize custom designs completely
  let displayImageUrl = merchandise?.image?.url || '';
  let displayImageType = 'PRODUCT';

  if (isCustomDesign) {
    // ABSOLUTE PRIORITY: If we have a local design URL from storage, use it
    if (localDesignUrl) {
      displayImageUrl = localDesignUrl;
      displayImageType = 'CUSTOM_DESIGN';
      console.log('✅ [Checkout] Using custom design from storage:', localDesignUrl.substring(0, 50) + '...');
    } 
    // SECOND: Direct URL from cart attributes
    else if (customDesignImage?.startsWith('http')) {
      displayImageUrl = customDesignImage;
      displayImageType = 'CUSTOM_DESIGN';
      console.log('✅ [Checkout] Using custom design URL from cart attributes');
    } 
    // THIRD: Base64 image from cart attributes
    else if (customDesignImage?.startsWith('data:image')) {
      displayImageUrl = customDesignImage;
      displayImageType = 'CUSTOM_DESIGN';
      console.log('✅ [Checkout] Using custom design base64 from cart attributes');
    } 
    // FOURTH: Fallback to customized base image
    else if (customizedImage?.startsWith('http')) {
      displayImageUrl = customizedImage;
      displayImageType = 'CUSTOMIZED_BASE';
      console.log('⚠️ [Checkout] Using customized base image as fallback');
    } 
    // LAST RESORT: Product image with custom label
    else {
      displayImageUrl = merchandise?.image?.url || '';
      displayImageType = 'VARIANT_WITH_CUSTOM_LABEL';
      console.warn('❌ [Checkout] Could not load custom design, using product image');
    }
  } else {
    // Standard product without customization
    displayImageUrl = merchandise?.image?.url || '';
    displayImageType = 'VARIANT';
  }

  console.log(`🖼️ [Checkout] Final image decision for ${merchandise?.product?.title}:`, {
    displayImageType,
    hasImageUrl: !!displayImageUrl,
    isCustomDesign,
    hasLocalDesignUrl: !!localDesignUrl,
    imageLoadAttempted,
  });

  return (
    <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 border border-white/20 relative">
          {displayImageUrl ? (
            displayImageType === 'CUSTOM_DESIGN' || displayImageType === 'CUSTOMIZED_BASE' ? (
              // Custom design image - URL or base64
              <div className="relative h-full">
                <img
                  src={displayImageUrl}
                  className="w-full h-full object-cover"
                  alt={`Custom ${merchandise.product.title}`}
                  onError={(e) => {
                    console.error('🚨 [Checkout] Custom design image failed to load:', displayImageUrl?.substring(0, 100));
                    // If the custom design image fails to load, try falling back to the product image
                    if (merchandise?.image?.url) {
                      console.log('♻️ [Checkout] Falling back to product image');
                      e.currentTarget.src = merchandise.image.url;
                    } else {
                      // Hide the image on error if no fallback is available
                      console.log('❌ [Checkout] No fallback image available, hiding image');
                      e.currentTarget.style.display = 'none';
                    }
                  }}
                  onLoad={() => {
                    console.log('✅ [Checkout] Custom design image loaded successfully');
                  }}
                />
                
                {/* Show a badge indicating this is a custom design */}
                <div className="absolute bottom-0 w-full py-1 px-1 bg-black/70 backdrop-blur-sm text-center">
                  <span className="text-xs text-white font-medium">
                    {displayImageType === 'CUSTOM_DESIGN' ? 'Custom Design' : 'Customized'}
                  </span>
                </div>
              </div>
            ) : merchandise.image ? (
              // Standard Shopify product image object
              <Image
                data={merchandise.image}
                sizes="80px"
                className="w-full h-full object-cover"
                alt={merchandise.product.title}
              />
            ) : (
              // Fallback
              <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
                {isCustomDesign ? '🎨' : 'No Image'}
              </div>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
              No Image
            </div>
          )}
          
          {/* Custom design indicator */}
          {(displayImageType === 'CUSTOM_DESIGN' || 
            displayImageType === 'CUSTOMIZED_BASE' || 
            displayImageType === 'VARIANT_WITH_CUSTOM_LABEL') && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 border-2 border-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs">🎨</span>
            </div>
          )}
        </div>

        {/* Custom design status badge */}
        {isCustomDesign && (
          <div className="mt-2 text-center">
            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
              displayImageType === 'CUSTOM_DESIGN' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                : displayImageType === 'CUSTOMIZED_BASE' 
                  ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                  : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-300'
            }`}>
              🎨 {displayImageType === 'CUSTOM_DESIGN' 
                  ? 'Custom' 
                  : displayImageType === 'CUSTOMIZED_BASE' 
                    ? 'Customized'
                    : 'Processing'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-semibold text-white text-lg">
          {merchandise.product.title}
        </h3>
        {merchandise.title && merchandise.title !== 'Default Title' && (
          <p className="text-white/70 text-sm">{merchandise.title}</p>
        )}

        {/* Custom design attributes - user-friendly display */}
        {isCustomDesign && attributes && (
          <div className="mt-2 space-y-1">
            {attributes
              .filter((attr) => !attr.key.startsWith('_')) // Only show non-hidden attributes
              .map((attr) => (
                <div key={attr.key} className="text-white/60 text-xs">
                  <span className="font-medium">{attr.key}:</span> {attr.value}
                </div>
              ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="text-white/70 text-sm">Quantity: {quantity}</div>
          <div className="text-white font-bold">
            <Money data={merchandise.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

const CART_QUERY = `#graphql
  query Cart($cartId: ID!, $numCartLines: Int!) {
    cart(id: $cartId) {
      ...CartApiQuery
    }
  }
  ${CART_QUERY_FRAGMENT}
` as const;

/**
 * Custom checkout page that displays custom design images properly
 * and provides a clean review experience before payment
 */
export default function Checkout() {
  const {cart, checkoutDomain} = useLoaderData<LoaderData>();
  const config = useConfig();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPreparingOrder, setIsPreparingOrder] = useState(false);
  const [prepareError, setPrepareError] = useState<string | null>(null);
  const [checkoutReady, setCheckoutReady] = useState(false);

  // Check if any items have custom designs
  const hasCustomDesigns = cart?.lines?.nodes?.some((line) =>
    line.attributes?.some(
      (attr) => attr.key === '_custom_design' && attr.value === 'true',
    ),
  ) || false;
  
  // Function to prepare cart for checkout by ensuring all design images are uploaded
  const prepareCartForCheckout = useCallback(async () => {
    if (!cart?.id) return;
    
    setIsPreparingOrder(true);
    setPrepareError(null);
    
    try {
      console.log('🔄 Preparing cart for checkout...');
      const response = await fetch('/api/cart-prepare-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartId: cart.id }),
      });
      
      const result = await response.json() as {
        success: boolean;
        message?: string;
        error?: string;
        designCount?: number;
      };
      
      if (result.success) {
        console.log('✅ Cart prepared successfully with', result.designCount || 0, 'designs');
        setCheckoutReady(true);
        return true;
      } else {
        console.error('❌ Failed to prepare cart:', result.error);
        setPrepareError(result.error || 'Failed to prepare order');
        setCheckoutReady(false);
        return false;
      }
    } catch (error) {
      console.error('❌ Error preparing cart for checkout:', error);
      setPrepareError('Network error preparing your order');
      setCheckoutReady(false);
      return false;
    } finally {
      setIsPreparingOrder(false);
    }
  }, [cart?.id]);
  
  // Initialize checkout preparation if cart has custom designs
  useEffect(() => {
    if (hasCustomDesigns && cart?.id && !isPreparingOrder && !checkoutReady && !prepareError) {
      prepareCartForCheckout();
    } else if (!hasCustomDesigns && cart?.id) {
      // If no custom designs, checkout is already ready
      setCheckoutReady(true);
    }
  }, [hasCustomDesigns, cart?.id, isPreparingOrder, checkoutReady, prepareError, prepareCartForCheckout]);

  const handleProceedToPayment = async () => {
    setIsProcessing(true);
    
    // If we have custom designs but they haven't been prepared yet, prepare them first
    if (hasCustomDesigns && !checkoutReady && !isPreparingOrder) {
      const success = await prepareCartForCheckout();
      if (!success) {
        setIsProcessing(false);
        return; // Don't proceed if preparation failed
      }
    }
    
    // Create checkout URL on the centralized domain or use Shopify's checkout
    if (cart.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    } else {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/80 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-secondary/40 backdrop-blur-md border-b border-primary/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="text-primary hover:text-primary-600 flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart</span>
              </Link>
            </div>
            <h1 className="text-xl font-bold text-white">
              {config.brandName} Checkout
            </h1>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Order Review - Left Side */}
          <div className="order-2 lg:order-1">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Review
              </h2>

              {/* Line Items */}
              <div className="space-y-4 mb-6">
                {cart?.lines?.nodes?.map((line) => (
                  <CheckoutLineItem key={line.id} line={line} />
                )) || []}
              </div>

              {/* Security Features */}
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-semibold text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Secure Checkout Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <CreditCard className="w-4 h-4 text-blue-400" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Truck className="w-4 h-4 text-green-400" />
                    <span>Fast, reliable shipping</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>SSL encrypted transaction</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/70 text-sm">
                    <ExternalLink className="w-4 h-4 text-orange-400" />
                    <span>Shopify secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Payment - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="bg-secondary/40 backdrop-blur-md border border-primary/20 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">
                    Subtotal ({cart?.totalQuantity || 0} item
                    {(cart?.totalQuantity || 0) !== 1 ? 's' : ''})
                  </span>
                  <span className="text-white font-medium">
                    {cart.cost?.subtotalAmount ? (
                      <Money data={cart.cost.subtotalAmount} />
                    ) : (
                      '-'
                    )}
                  </span>
                </div>

                {cart.cost?.totalTaxAmount?.amount && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Tax (estimated)</span>
                    <span className="text-white font-medium">
                      <Money data={cart.cost.totalTaxAmount} />
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-white/70">Shipping</span>
                  <span className="text-white/70 text-sm">
                    Calculated at checkout
                  </span>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-primary font-bold text-xl">
                      {cart.cost?.totalAmount ? (
                        <Money data={cart.cost.totalAmount} />
                      ) : (
                        '-'
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom Design Notice */}
              {hasCustomDesigns && (
                <div className="mb-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-400 mt-0.5">🎨</div>
                    <div>
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">
                        Custom Design Order
                      </h4>
                      <p className="text-blue-200 text-xs">
                        Your custom design will be printed exactly as shown
                        above. Production typically takes 2-3 business days.
                      </p>
                      {isPreparingOrder && (
                        <div className="mt-2 flex items-center text-blue-200 text-xs">
                          <div className="w-3 h-3 border-2 border-blue-300/30 border-t-blue-300 rounded-full animate-spin mr-1"></div>
                          Preparing designs for production...
                        </div>
                      )}
                      {checkoutReady && hasCustomDesigns && (
                        <div className="mt-2 text-green-300 text-xs flex items-center">
                          ✓ Designs ready for production
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error message */}
              {prepareError && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-600/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="text-red-400 mt-0.5">⚠️</div>
                    <div>
                      <h4 className="text-red-300 font-semibold text-sm mb-1">
                        Error Preparing Designs
                      </h4>
                      <p className="text-red-200 text-xs">
                        {prepareError} Please try again or contact customer support.
                      </p>
                      <button 
                        onClick={() => prepareCartForCheckout()}
                        className="mt-2 text-xs text-white bg-red-600/30 hover:bg-red-600/50 px-3 py-1 rounded-full"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Proceed to Payment Button */}
              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-background font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-primary/25 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Proceed to Secure Payment</span>
                  </>
                )}
              </button>

              <div className="mt-4 text-center">
                <p className="text-white/50 text-xs">
                  You'll be securely redirected to Shopify's payment processor
                </p>
              </div>

              {/* Alternative Actions */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3">
                  <Link
                    to="/cart"
                    className="block w-full text-center bg-secondary/60 hover:bg-secondary/80 text-white border border-primary/20 py-3 px-4 rounded-lg transition-colors"
                  >
                    ← Back to Cart
                  </Link>
                  <Link
                    to="/collections"
                    className="block w-full text-center text-primary hover:text-primary-600 py-2 text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
