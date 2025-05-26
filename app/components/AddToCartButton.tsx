import {type FetcherWithComponents} from 'react-router';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {useConfig} from '~/utils/themeContext';
import {useCart} from '~/hooks/useCart';
import {useEffect, useRef} from 'react';

export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className,
}: {
  analytics?: unknown;
  children: React.ReactNode;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  className?: string;
}) {
  const config = useConfig();
  const {refreshCart} = useCart();
  const defaultClasses = "w-full bg-primary hover:bg-primary-600 text-background font-bold py-4 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-glow transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  const prevFetcherStateRef = useRef<string | null>(null);
  
  // Debug the merchandiseId format
  useEffect(() => {
    console.log('AddToCartButton lines:', JSON.stringify(lines));
    if (lines.length > 0) {
      const merchandiseId = lines[0].merchandiseId;
      console.log('MerchandiseId format check:', {
        id: merchandiseId,
        hasGidPrefix: merchandiseId.startsWith('gid://'),
        type: typeof merchandiseId
      });
    }
  }, [lines]);

  const handleClick = (e: React.MouseEvent) => {
    console.log('AddToCartButton clicked with lines:', JSON.stringify(lines));
    console.log('Button event:', e.type, 'preventDefault called:', e.defaultPrevented);
    
    // Don't prevent default to allow form submission
    
    // Call the onClick prop if provided
    onClick?.();
  };

  return (
    <CartForm route="/en/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => {
        console.log('CartForm fetcher state:', fetcher.state, 'data:', fetcher.data, 'formData:', fetcher.formData);
        
        // Check for state transitions
        if (prevFetcherStateRef.current !== fetcher.state) {
          console.log(`CartForm fetcher state changed from ${prevFetcherStateRef.current} to ${fetcher.state}`);
          prevFetcherStateRef.current = fetcher.state;
          
          if (fetcher.state === 'submitting') {
            console.log('Form is submitting with data:', fetcher.formData ? Object.fromEntries(fetcher.formData) : 'No formData');
          }
        }
        
        // Refresh cart data when the fetcher transitions from submitting to idle with data
        if (fetcher.state === 'idle' && fetcher.data && fetcher.data.cart) {
          console.log('Cart form submission successful, refreshing cart. Data:', fetcher.data);
          // Small timeout to ensure everything is processed
          setTimeout(() => refreshCart(), 100);
        } else if (fetcher.state === 'idle' && fetcher.data && !fetcher.data.cart) {
          console.log('Cart form submission completed but no cart data returned:', fetcher.data);
          if (fetcher.data.errors) {
            console.error('Cart errors:', fetcher.data.errors);
          }
        }
        
        return (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              type="submit"
              onClick={handleClick}
              disabled={disabled ?? fetcher.state !== 'idle'}
              className={className || defaultClasses}
            >
              {children}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
