import {useEffect, useState} from 'react';
import {Loader2} from 'lucide-react';

interface CheckoutResult {
  success: boolean;
  designCount?: number;
  message?: string;
  error?: string;
}

interface PrepareDesignsForCheckoutProps {
  cart: any; // Cart data
  onComplete?: () => void; // Callback when preparation is complete
  onError?: (error: Error) => void; // Callback when an error occurs
}

/**
 * This component prepares custom designs for Shopify checkout
 * It analyzes the cart for custom designs and ensures they'll be visible
 * in the Shopify checkout page by generating proper line item properties
 */
export function PrepareDesignsForCheckout({
  cart,
  onComplete,
  onError,
}: PrepareDesignsForCheckoutProps) {
  const [isPreparingDesigns, setIsPreparingDesigns] = useState(false);
  const [designsPrepared, setDesignsPrepared] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  // Check if the cart has custom designs - support both cart structures
  const hasCustomDesigns = cart?.lines?.nodes?.some((node: any) =>
    node.attributes?.some(
      (attr: any) => attr.key === '_custom_design' && attr.value === 'true',
    ),
  ) || cart?.lines?.edges?.some((edge: any) =>
    edge.node.attributes?.some(
      (attr: any) => attr.key === '_custom_design' && attr.value === 'true',
    ),
  );

  // Handle preparing designs for checkout
  const prepareDesignsForCheckout = async () => {
    if (!hasCustomDesigns || !cart) return;

    setIsPreparingDesigns(true);
    setDesignsPrepared(false);
    setError(null);
    setProgress(0);
    setStatus('Preparing custom designs for checkout...');

    try {
      // Call our API endpoint to prepare designs for checkout
      const response = await fetch('/api/cart-prepare-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartId: cart.id
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to prepare designs: ${response.statusText}`);
      }

      const result = await response.json() as CheckoutResult;
      
      if (result.success) {
        setProgress(100);
        setStatus('Custom designs prepared for checkout');
        setDesignsPrepared(true);
        
        // Look for the checkout form
        const checkoutForm = document.querySelector('form[action*="/cart"]') as HTMLFormElement;
        
        // If we have custom design images, add them to the form for checkout
        if (result.designCount && result.designCount > 0 && checkoutForm) {
          // Get all lines with custom designs
          const customDesignLines = cart.lines?.nodes?.filter((line: any) =>
            line.attributes?.some(
              (attr: any) => attr.key === '_custom_design' && attr.value === 'true',
            )
          ) || [];
            
          // For each line with custom designs
          customDesignLines.forEach((line: any) => {
            const allDesignedImagesAttr = line.attributes.find(
              (attr: any) => attr.key === '_all_designed_images'
            )?.value;
            
            // If we have design URLs in attributes
            if (allDesignedImagesAttr) {
              try {
                const designUrls = JSON.parse(allDesignedImagesAttr) as unknown[];
                
                // Add each design URL as a property to the form
                if (Array.isArray(designUrls)) {
                  designUrls.forEach((url: unknown, index: number) => {
                    if (typeof url === 'string' && url.startsWith('http')) {
                      // Create a hidden input with the design URL
                      const input = document.createElement('input');
                      input.type = 'hidden';
                      input.name = `properties[_Design ${index + 1}]`;
                      input.value = url;
                      
                      // Add to the form
                      checkoutForm.appendChild(input);
                    }
                  });
                }
              } catch (e) {
                console.error('Error parsing design URLs:', e);
              }
            }
          });
        }
        
        if (onComplete) onComplete();
      } else {
        throw new Error(result.error || 'Unknown error preparing designs');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      if (onError) onError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsPreparingDesigns(false);
    }
  };

  // Automatically prepare designs when the component mounts
  useEffect(() => {
    if (hasCustomDesigns && !designsPrepared && !isPreparingDesigns) {
      prepareDesignsForCheckout();
    }
  }, []);

  if (!hasCustomDesigns) {
    return null;
  }

  // Show minimal UI during preparation
  if (isPreparingDesigns) {
    return (
      <div className="mt-2 p-3 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg">
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          <div className="flex-1">
            <div className="text-xs text-blue-300 font-medium">{status}</div>
            <div className="w-full bg-blue-900/50 rounded-full h-1 mt-1">
              <div
                className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                style={{width: `${progress}%`}}
              />
            </div>
          </div>
          <span className="text-xs text-blue-300">{progress}%</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-xs text-red-300">
            ⚠️ Error preparing designs: {error.message}
          </div>
          <button
            onClick={prepareDesignsForCheckout}
            className="ml-3 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs rounded-md transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (designsPrepared) {
    return (
      <div className="mt-2 p-3 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-lg">
        <div className="flex items-center justify-center space-x-2 text-xs text-green-300">
          <span className="text-green-400">✓</span>
          <span>Custom designs ready for checkout</span>
        </div>
      </div>
    );
  }

  return null;
} 