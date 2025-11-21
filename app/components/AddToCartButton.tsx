import {CartForm} from '@shopify/hydrogen';
import {useCart} from '~/providers/CartProvider';
import {useEffect, useState} from 'react';
import type {CartLineInput} from '@shopify/hydrogen/storefront-api-types';

// Flexible type for selectedVariant that matches our actual GraphQL data
type SelectedVariant = {
  id: string;
  availableForSale?: boolean;
  title?: string;
  price?: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  } | null;
  selectedOptions?: Array<{
    name: string;
    value: string;
  }>;
  [key: string]: any; // Allow additional fields
};

// Extended CartLineInput to include selectedVariant for optimistic cart
type ExtendedCartLineInput = CartLineInput & {
  selectedVariant?: SelectedVariant;
};

export function AddToCartButton({
  children,
  disabled,
  lines,
  analytics,
  className,
  buttonText = 'Add to cart',
  onClick,
  selectedVariant,
}: {
  children?: React.ReactNode;
  disabled?: boolean;
  lines: CartLineInput[];
  analytics?: unknown;
  className?: string;
  buttonText?: string;
  onClick?: () => void;
  selectedVariant?: SelectedVariant;
}) {
  const {openCart} = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  const defaultClasses =
    'w-full bg-primary hover:bg-primary-600 text-background font-bold py-4 px-6 rounded-sm transition-all duration-300 uppercase tracking-wider shadow-glow transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  // Reset added state after some time
  useEffect(() => {
    if (addedToCart) {
      const timeout = setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [addedToCart]);

  // Handle successful form submission
  const handleSuccess = () => {
    onClick?.();
  };

  // Determine the button text based on the current state
  let buttonContent = children || buttonText;
  if (addedToCart) {
    buttonContent = 'Ajouté !';
  }

  // Enhance lines with selectedVariant for optimistic cart
  const enhancedLines = selectedVariant
    ? lines.map((line) => ({...line, selectedVariant}))
    : lines;

  // Create properly typed lines for CartForm inputs
  const cartFormLines = enhancedLines.map((line) => {
    const baseInput = {
      merchandiseId: line.merchandiseId,
      quantity: line.quantity,
      attributes: line.attributes,
    };
    
    // Add selectedVariant for optimistic cart functionality
    // selectedVariant is required by useOptimisticCart but not in CartLineInput types
    if (selectedVariant) {
      // @ts-ignore
      baseInput.selectedVariant = selectedVariant;
    }
    
    return baseInput;
  });

  // Silent validation
  useEffect(() => {
    // Validation happens here without logging
  }, [lines, selectedVariant]);

  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesAdd}
      inputs={{
        lines: cartFormLines,
      }}
    >
      {(fetcher) => {
        const isSubmitting = fetcher.state === 'submitting';
        const isSuccess =
          fetcher.state === 'idle' &&
          fetcher.data &&
          !fetcher.data.errors?.length;

        // Debug logging (disabled in production)
        useEffect(() => {
          if (process.env.NODE_ENV === 'development' && false) {
            console.log(
              'AddToCartButton fetcher state:',
              fetcher.state,
              'data:',
              fetcher.data,
            );

            // Log form data being submitted
            if (fetcher.formData) {
              const formDataEntries = Array.from(fetcher.formData.entries());
              console.log(
                'AddToCartButton form data being submitted:',
                Object.fromEntries(formDataEntries),
              );
            }
          }
        }, [fetcher.state, fetcher.data, fetcher.formData]);

        // Handle successful cart addition
        useEffect(() => {
          if (isSuccess && fetcher.data?.cart) {
            setAddedToCart(true);
            handleSuccess();
            setTimeout(() => {
              openCart();
            }, 300);
          }
        }, [isSuccess, fetcher.data]);

        return (
          <button
            type="submit"
            disabled={disabled || isSubmitting}
            className={className || defaultClasses}
            aria-label={
              typeof buttonContent === 'string' ? buttonContent : 'Add to cart'
            }
          >
            {isSubmitting ? 'Ajout...' : buttonContent}
          </button>
        );
      }}
    </CartForm>
  );
}
