import {useState, useEffect} from 'react';
import {useConfig} from '~/utils/themeContext';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {ShopPayButton} from '@shopify/hydrogen';
import {Money} from '~/components/Money';
import type {ProductDetailsQuery} from 'storefrontapi.generated';
import {useCart} from '~/providers/CartProvider';
import {useLoaderData} from 'react-router';
import {getColorInfo, isColorOption} from '~/utils/colorMapping';
import {getDominantColorCached, getContrastColor} from '~/utils/colorExtractor';
import {ProductGuarantees} from './ProductGuarantees';

// Define a safer type using explicit types rather than referencing a potential null type
interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{name: string; value: string}>;
  price: {
    amount: string;
    currencyCode: any; // Use any for CurrencyCode to avoid enum issues
    __typename?: 'MoneyV2';
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: any; // Use any for CurrencyCode to avoid enum issues
    __typename?: 'MoneyV2';
  } | null;
  sku?: string | null;
}

export function ProductForm({
  product,
  storeDomain,
  onVariantChange,
}: {
  product: NonNullable<ProductDetailsQuery['product']>;
  storeDomain?: string;
  onVariantChange?: (variant: any) => void;
}) {
  const config = useConfig();
  const {open} = useAside();
  const {openCart} = useCart();
  const data = useLoaderData() as any;

  // States
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [isAdding, setIsAdding] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [extractedColors, setExtractedColors] = useState<Record<string, string>>({});

  // Initialize the selected variant
  useEffect(() => {
    const variant = product.selectedVariant || product.variants?.nodes?.[0];
    if (variant) {
      // Create a basic variant without the image field
      setSelectedVariant({
        id: variant.id,
        title: variant.title,
        availableForSale: variant.availableForSale,
        selectedOptions: variant.selectedOptions,
        price: {
          amount: variant.price.amount,
          currencyCode: variant.price.currencyCode,
          __typename: 'MoneyV2',
        },
        compareAtPrice: variant.compareAtPrice
          ? {
              amount: variant.compareAtPrice.amount,
              currencyCode: variant.compareAtPrice.currencyCode,
              __typename: 'MoneyV2',
            }
          : null,
        sku: variant.sku,
      });

      setSelectedOptions(
        variant.selectedOptions.reduce(
          (acc: Record<string, string>, option) => {
            acc[option.name] = option.value;
            return acc;
          },
          {},
        ),
      );
    }
  }, [product]);

  // Call onVariantChange once when the selected variant is initialized or changes
  useEffect(() => {
    if (selectedVariant && onVariantChange) {
      const variantWithImage = product.variants?.nodes?.find(
        (variant) => variant.id === selectedVariant.id,
      );
      if (variantWithImage) {
        onVariantChange(variantWithImage);
      }
    }
    // Intentionally only depend on selectedVariant.id, not the entire object or onVariantChange
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant?.id, product.variants?.nodes]);

  // Extract colors from variant images for color options
  useEffect(() => {
    const extractColors = async () => {
      const colorOptions = product.options.filter((opt) => isColorOption(opt.name));
      if (colorOptions.length === 0) return;

      const variantNodes = product.variants?.nodes || [];
      const colors: Record<string, string> = {};

      // Process each color option value
      for (const colorOption of colorOptions) {
        for (const value of colorOption.values) {
          // Find ALL variants with this exact color option value
          const matchingVariants = variantNodes.filter((v) =>
            v.selectedOptions.some(
              (opt) => opt.name === colorOption.name && opt.value === value
            )
          );

          // Try to find a variant with an image
          let variantWithImage = matchingVariants.find((v) => v.image?.url);

          // Fallback: use first matching variant even without image
          if (!variantWithImage && matchingVariants.length > 0) {
            variantWithImage = matchingVariants[0];
          }

          // Extract color from variant image
          if (variantWithImage?.image?.url) {
            try {
              const imageUrl = variantWithImage.image.url;
              console.log(`🎨 Extracting color for "${value}" from:`, imageUrl);

              const dominantColor = await getDominantColorCached(imageUrl);
              if (dominantColor) {
                colors[value] = dominantColor;
                console.log(`✅ Color extracted for "${value}":`, dominantColor);
              } else {
                console.warn(`⚠️ Failed to extract color for "${value}"`);
              }
            } catch (error) {
              console.error(`❌ Error extracting color for "${value}":`, error);
            }
          } else {
            console.warn(`⚠️ No image found for color option "${value}"`);
          }
        }
      }

      console.log('📊 All extracted colors:', colors);
      setExtractedColors(colors);
    };

    extractColors();
  }, [product.options, product.variants?.nodes]);

  // Find options available in this product
  const options = product.options.filter((option) => option.values.length > 1);

  // Update the selected variant when options change
  const updateSelectedVariant = (name: string, value: string) => {
    // Update the selected options
    const newSelectedOptions = {...selectedOptions, [name]: value};
    setSelectedOptions(newSelectedOptions);

    // Find the variant that matches all selected options
    const variantNodes = product.variants?.nodes || [];
    const newVariant = variantNodes.find((variant) => {
      return variant.selectedOptions.every((option) => {
        return newSelectedOptions[option.name] === option.value;
      });
    });

    if (newVariant) {
      // Set the variant without the image field to avoid type issues
      setSelectedVariant({
        id: newVariant.id,
        title: newVariant.title,
        availableForSale: newVariant.availableForSale,
        selectedOptions: newVariant.selectedOptions,
        price: {
          amount: newVariant.price.amount,
          currencyCode: newVariant.price.currencyCode,
          __typename: 'MoneyV2',
        },
        compareAtPrice: newVariant.compareAtPrice
          ? {
              amount: newVariant.compareAtPrice.amount,
              currencyCode: newVariant.compareAtPrice.currencyCode,
              __typename: 'MoneyV2',
            }
          : null,
        sku: newVariant.sku,
      });

      // The useEffect that depends on selectedVariant.id will handle calling onVariantChange
    }
  };

  // Quantity handlers
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Handle quantity input changes
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Format the variant ID to ensure it has the proper Shopify GID prefix
  const formatVariantId = (id: string) => {
    if (!id) return '';
    if (id.startsWith('gid://shopify/ProductVariant/')) return id;

    // Extract the numeric ID if it's already in a GID format
    const numericId = id.includes('/') ? id.split('/').pop() || id : id;

    return `gid://shopify/ProductVariant/${numericId}`;
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setIsAdding(true);

    // The actual cart adding happens in the AddToCartButton component
    // Here we just manage the UI feedback
    setTimeout(() => {
      setIsAdding(false);
      setAddedToCart(true);

      // Reset the success message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);

      // Open cart after adding
      setTimeout(() => {
        openCart();
      }, 500);
    }, 500);
  };

  // Prepare the lines for the cart
  const lines = selectedVariant
    ? [
        {
          merchandiseId: formatVariantId(selectedVariant.id),
          quantity,
        },
      ]
    : [];

  // Check if variant is available
  const isAvailable = selectedVariant?.availableForSale || false;

  if (!selectedVariant) {
    return <div>Chargement des options...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Options Selection */}
      {options.length > 0 && (
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.name}>
              <h3 className="text-sm font-medium mb-2 text-black">
                {option.name}
                {selectedOptions[option.name] &&
                  (() => {
                    const variantNodes = product.variants?.nodes || [];
                    const currentOptionVariant = variantNodes.find((variant) =>
                      variant.selectedOptions.some(
                        (opt) =>
                          opt.name === option.name &&
                          opt.value === selectedOptions[option.name],
                      ),
                    );
                    const isCurrentOptionAvailable =
                      currentOptionVariant?.availableForSale || false;

                    return isCurrentOptionAvailable ? (
                      <span className="ml-1 font-normal text-black">
                        - {selectedOptions[option.name]}
                      </span>
                    ) : null;
                  })()}
              </h3>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  const variantNodes = product.variants?.nodes || [];
                  const optionVariant = variantNodes.find((variant) =>
                    variant.selectedOptions.some(
                      (opt) => opt.name === option.name && opt.value === value,
                    ),
                  );
                  const isAvailableOption =
                    optionVariant?.availableForSale || false;

                  // Check if this is a color option and get color info
                  const isColor = isColorOption(option.name);

                  // Try to get extracted color from image first, fallback to mapping
                  let backgroundColor: string | undefined;
                  let textColor = '#000000';

                  if (isColor) {
                    // Priority 1: Use extracted color from variant image
                    if (extractedColors[value]) {
                      backgroundColor = extractedColors[value];
                      textColor = getContrastColor(backgroundColor) === 'light' ? '#ffffff' : '#000000';
                    }
                    // Priority 2: Fallback to color mapping
                    else {
                      const colorInfo = getColorInfo(value);
                      if (colorInfo) {
                        backgroundColor = colorInfo.hex;
                        textColor = colorInfo.textColor === 'light' ? '#ffffff' : '#000000';
                      }
                    }
                  }

                  return (
                    <button
                      key={value}
                      onClick={() => updateSelectedVariant(option.name, value)}
                      className={`min-w-[80px] px-4 py-2 border text-sm rounded-sm relative transition-all ${
                        isSelected
                          ? backgroundColor
                            ? 'border-primary ring-2 ring-primary ring-offset-2'
                            : 'border-black ring-2 ring-black ring-offset-2 text-black'
                          : isAvailableOption
                            ? backgroundColor
                              ? 'border-primary/20 hover:border-primary/50 hover:scale-105'
                              : 'border-black/30 hover:border-black hover:scale-105 text-black'
                            : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      style={
                        backgroundColor && (isAvailableOption || isSelected)
                          ? {
                              backgroundColor,
                              color: textColor,
                            }
                          : undefined
                      }
                      disabled={!isAvailableOption}
                    >
                      {isAvailableOption && value}
                      {!isAvailableOption && (
                        <span className="absolute inset-0 flex items-center justify-center text-xs">
                          Épuisé
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SKU display */}
      {selectedVariant?.sku && (
        <div className="text-sm text-black">
          SKU: {selectedVariant.sku}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium mb-2 text-black">
          Quantité
        </label>
        <div className="flex items-center max-w-[140px]">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1 || !isAvailable}
            className="w-10 h-10 flex items-center justify-center rounded-l-sm disabled:opacity-50 transition-colors border border-black text-black hover:bg-black hover:text-white"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div
            className="w-16 h-10 flex items-center justify-center border-t border-b border-black text-black font-medium"
          >
            {quantity}
          </div>
          <button
            onClick={incrementQuantity}
            disabled={!isAvailable}
            className="w-10 h-10 flex items-center justify-center rounded-r-sm disabled:opacity-50 transition-colors border border-black text-black hover:bg-black hover:text-white"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <AddToCartButton
          lines={lines}
          selectedVariant={selectedVariant}
          disabled={!isAvailable || isAdding}
          onClick={handleAddToCart}
          className={`w-full py-3 px-6 rounded-sm flex items-center justify-center relative ${
            isAvailable
              ? 'bg-primary hover:bg-black text-black hover:text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition-all duration-300 uppercase tracking-wider font-bold`}
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Ajout en cours...
            </div>
          ) : addedToCart ? (
            <div className="flex items-center justify-center">
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Ajouté au panier !
            </div>
          ) : isAvailable ? (
            'Ajouter au panier'
          ) : (
            'Rupture de stock'
          )}
        </AddToCartButton>

        {/* Product Guarantees */}
        <ProductGuarantees />
      </div>
    </div>
  );
}
