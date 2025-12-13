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
import {ColorSelector} from './ColorSelector';

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
  externalSelectedVariant,
  colorOptions,
}: {
  product: NonNullable<ProductDetailsQuery['product']>;
  storeDomain?: string;
  onVariantChange?: (variant: any) => void;
  externalSelectedVariant?: any; // Variant contrôlée depuis l'extérieur (ex: ColorCarousel)
  colorOptions?: Array<{name: string; imageUrl: string; variantId: string; value?: string; availableForSale?: boolean}>; // Images de couleur depuis ColorCarousel
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
  const [isManualUpdate, setIsManualUpdate] = useState(false);

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

  // 🆕 Synchroniser avec la variant externe (ColorCarousel)
  useEffect(() => {
    // Don't sync if user is manually selecting options
    if (isManualUpdate) {
      console.log('⏸️ Skipping ColorCarousel sync - manual update in progress');
      return;
    }

    if (externalSelectedVariant && externalSelectedVariant.id !== selectedVariant?.id) {
      console.log('🎨 ProductForm: Mise à jour depuis ColorCarousel', {
        externalId: externalSelectedVariant.id,
        currentId: selectedVariant?.id,
        externalOptions: externalSelectedVariant.selectedOptions,
      });

      // Batch updates: prepare all data first
      const variantData = {
        id: externalSelectedVariant.id,
        title: externalSelectedVariant.title,
        availableForSale: externalSelectedVariant.availableForSale,
        selectedOptions: externalSelectedVariant.selectedOptions,
        price: {
          amount: externalSelectedVariant.price.amount,
          currencyCode: externalSelectedVariant.price.currencyCode,
          __typename: 'MoneyV2' as const,
        },
        compareAtPrice: externalSelectedVariant.compareAtPrice
          ? {
              amount: externalSelectedVariant.compareAtPrice.amount,
              currencyCode: externalSelectedVariant.compareAtPrice.currencyCode,
              __typename: 'MoneyV2' as const,
            }
          : null,
        sku: externalSelectedVariant.sku,
      };

      const optionsData = externalSelectedVariant.selectedOptions.reduce(
        (acc: Record<string, string>, option: any) => {
          acc[option.name] = option.value;
          return acc;
        },
        {},
      );

      // Update both states together for automatic batching
      setSelectedVariant(variantData);
      setSelectedOptions(optionsData);
    }
  }, [externalSelectedVariant, selectedVariant?.id, isManualUpdate]);

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
  // Exclure les options de couleur car elles sont gérées par le ColorCarousel
  const options = product.options.filter(
    (option) =>
      option.values.length > 1 &&
      !isColorOption(option.name)
  );

  // Update the selected variant when options change
  const updateSelectedVariant = (name: string, value: string) => {
    console.log('🔄 updateSelectedVariant called:', {name, value, currentOptions: selectedOptions});

    // Block ColorCarousel sync during manual update
    setIsManualUpdate(true);

    // Update the selected options first (what the user clicked)
    const newSelectedOptions = {...selectedOptions, [name]: value};
    console.log('📝 New options would be:', newSelectedOptions);

    // Find the variant that matches ALL selected options (exact match only)
    const variantNodes = product.variants?.nodes || [];
    const newVariant = variantNodes.find((variant) => {
      return variant.selectedOptions.every((option) => {
        return newSelectedOptions[option.name] === option.value;
      });
    });

    console.log('🔍 Variant search result:', {
      found: !!newVariant,
      variantId: newVariant?.id,
      variantTitle: newVariant?.title,
    });

    // Only update variant if exact match found
    if (newVariant) {
      const variantData = {
        id: newVariant.id,
        title: newVariant.title,
        availableForSale: newVariant.availableForSale,
        selectedOptions: newVariant.selectedOptions,
        price: {
          amount: newVariant.price.amount,
          currencyCode: newVariant.price.currencyCode,
          __typename: 'MoneyV2' as const,
        },
        compareAtPrice: newVariant.compareAtPrice
          ? {
              amount: newVariant.compareAtPrice.amount,
              currencyCode: newVariant.compareAtPrice.currencyCode,
              __typename: 'MoneyV2' as const,
            }
          : null,
        sku: newVariant.sku,
      };

      setSelectedOptions(newSelectedOptions);
      setSelectedVariant(variantData);

      // Notifier le parent (page produit) pour mettre à jour l'image principale
      if (onVariantChange) {
        onVariantChange(newVariant);
      }

      console.log('✅ Variant updated successfully');
    } else {
      console.warn('⚠️ No matching variant found - combination not available');
      // No exact match - keep current variant but update options
      setSelectedOptions(newSelectedOptions);
    }

    // Re-enable ColorCarousel sync after a short delay
    setTimeout(() => {
      setIsManualUpdate(false);
      console.log('🔓 Manual update complete - ColorCarousel sync re-enabled');
    }, 100);
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
          attributes: (() => {
            const attrs = [];

            // Add color swatch image URL if available
            if (colorOptions && colorOptions.length > 0) {
              const matchingColorOption = colorOptions.find(
                (option) => option.variantId === selectedVariant.id
              );

              if (matchingColorOption?.imageUrl) {
                attrs.push({
                  key: '_color_swatch_image',
                  value: matchingColorOption.imageUrl,
                });
              }
            }

            return attrs.length > 0 ? attrs : undefined;
          })(),
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
                {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
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

                  // Check if there's a variant with current selections + this value
                  const testOptions = {...selectedOptions, [option.name]: value};
                  const matchingVariant = variantNodes.find((variant) => {
                    return variant.selectedOptions.every((opt) => {
                      return testOptions[opt.name] === opt.value;
                    });
                  });

                  const isAvailableOption = matchingVariant?.availableForSale || false;

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
                      className={`min-w-[80px] px-4 border-2 text-sm rounded-sm relative transition-colors ${
                        isSelected
                          ? backgroundColor
                            ? 'border-primary ring-2 ring-primary ring-offset-2 py-2'
                            : 'border-primary ring-2 ring-primary ring-offset-2 bg-primary text-white py-2'
                          : isAvailableOption
                            ? backgroundColor
                              ? 'border-primary/30 hover:border-primary py-2'
                              : 'border-primary/30 hover:border-primary text-black py-2'
                            : 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed py-3'
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

      {/* Color Selector with Swatches */}
      {colorOptions && colorOptions.length > 0 && (() => {
        // Trouver l'option de couleur dans le produit
        const colorOption = product.options.find((opt) => isColorOption(opt.name));
        if (!colorOption) return null;

        // Couleur actuellement sélectionnée
        const currentColorValue = selectedOptions[colorOption.name] || colorOption.values[0];

        return (
          <ColorSelector
            label="Couleur"
            colors={colorOptions.map((colorOpt) => ({
              value: colorOpt.value || colorOpt.name, // Utiliser value (vraie valeur Shopify) ou fallback sur name
              label: colorOpt.name, // Label affiché (peut être différent de value)
              imageUrl: colorOpt.imageUrl,
              available: colorOpt.availableForSale ?? true,
              variantId: colorOpt.variantId,
            }))}
            selectedColor={currentColorValue}
            onChange={(colorValue) => {
              // Mettre à jour la variante sélectionnée avec la vraie valeur Shopify
              updateSelectedVariant(colorOption.name, colorValue);
            }}
            showSelect={false}
          />
        );
      })()}

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium mb-2 text-black">
          Quantité
        </label>
        <div className="flex items-center max-w-[140px] border-2 border-primary rounded-sm">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1 || !isAvailable}
            className="w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-colors bg-primary text-white hover:bg-primary/90 disabled:bg-gray-400"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <div
            className="w-16 h-10 flex items-center justify-center text-black font-medium"
          >
            {quantity}
          </div>
          <button
            onClick={incrementQuantity}
            disabled={!isAvailable}
            className="w-10 h-10 flex items-center justify-center disabled:opacity-50 transition-colors bg-primary text-white hover:bg-primary/90 disabled:bg-gray-400"
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
