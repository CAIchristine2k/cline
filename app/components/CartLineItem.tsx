import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from 'react-router';
import {useConfig} from '~/utils/themeContext';
import type {CartLineFragment} from 'storefrontapi.generated';
import type {CartLayout} from './CartMain';
import {Trash2, Plus, Minus} from 'lucide-react';

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
    console.warn('CartLineItem: merchandise or product data is missing', {
      line,
      merchandise,
    });
    return null;
  }

  const {product, title, image, selectedOptions} = merchandise;
  const isGiftCard = product.handle === 'gift-card';
  const lineItemUrl = `/products/${product.handle}`;

  // Debug all attributes
  console.log('🔍 CartLineItem Debug for product:', product.title, {
    lineId: id,
    allAttributes: attributes,
    attributeCount: attributes?.length || 0,
  });

  // Check for custom design image in attributes
  const customDesignImage = attributes?.find(
    (attr) => attr.key === '_design_image_url',
  )?.value;
  const isCustomDesign = attributes?.some(
    (attr) => attr.key === '_custom_design' && attr.value === 'true',
  );

  // Check if custom design image is a valid image (URL or base64) vs a placeholder
  const isValidCustomImage =
    customDesignImage &&
    (customDesignImage.startsWith('http') ||
      customDesignImage.startsWith('data:'));
  const shouldShowCustomImage = isCustomDesign && isValidCustomImage;

  // Debug logging for custom design
  console.log('🎨 CartLineItem: Custom design analysis', {
    isCustomDesign,
    hasCustomDesignImage: !!customDesignImage,
    customDesignImagePreview: customDesignImage
      ? `${customDesignImage.substring(0, 50)}...`
      : 'MISSING',
    imageLength: customDesignImage?.length,
    isCloudinaryURL: customDesignImage?.startsWith('http'),
    isBase64: customDesignImage?.startsWith('data:'),
    isValidImage: isValidCustomImage,
    shouldShowCustomImage: shouldShowCustomImage,
    originalProductImage: image?.url || 'NO PRODUCT IMAGE',
  });

  // Use custom design image if available, otherwise use product image
  const displayImage = shouldShowCustomImage ? customDesignImage : image;

  console.log('🖼️ CartLineItem: Final image decision', {
    displayImageType: shouldShowCustomImage ? 'CUSTOM' : 'PRODUCT',
    displayImageUrl: shouldShowCustomImage
      ? `${customDesignImage?.substring(0, 50)}...`
      : image?.url,
  });

  return (
    <div className="cart-line-item group">
      <div className="flex items-start gap-3">
        {/* Product Image - Slightly smaller for more text space */}
        <div className="relative flex-shrink-0">
          <Link to={lineItemUrl} prefetch="intent" className="block">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-200 group-hover:border-primary/30">
              {displayImage ? (
                shouldShowCustomImage ? (
                  // Custom design image - could be URL or base64
                  <img
                    src={customDesignImage}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={`Custom ${title || product.title || 'Product design'}`}
                    onError={(e) => {
                      console.error(
                        '🚨 Custom design image failed to load:',
                        customDesignImage?.substring(0, 100),
                      );
                      // Hide the image on error
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={() => {
                      console.log('✅ Custom design image loaded successfully');
                    }}
                  />
                ) : image ? (
                  // Standard Shopify product image object
                  <Image
                    data={image!}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={title || product.title || 'Product image'}
                    sizes="64px"
                  />
                ) : (
                  // No image available
                  <div className="w-full h-full flex items-center justify-center text-white/40 text-xs font-medium">
                    {isCustomDesign ? '🎨' : 'No Image'}
                  </div>
                )
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
          {shouldShowCustomImage && (
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
              <h3 className="font-semibold text-white text-sm leading-tight group-hover/title:text-primary transition-colors duration-200 line-clamp-2">
                {product.title || 'Untitled Product'}
              </h3>
            </Link>

            {/* Variant Details */}
            {title && title !== 'Default Title' && (
              <p className="text-white/60 text-xs font-medium">{title}</p>
            )}

            {/* Selected Options */}
            {selectedOptions &&
              selectedOptions.length > 0 &&
              selectedOptions[0]?.value !== 'Default Title' && (
                <div className="flex flex-wrap gap-1">
                  {selectedOptions.map((option) => (
                    <span
                      key={option.name}
                      className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/70 text-xs font-medium"
                    >
                      {option.value}
                    </span>
                  ))}
                </div>
              )}

            {/* Custom Design Badge */}
            {isCustomDesign && (
              <div className="flex items-center gap-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium">
                  🎨 Custom Design{shouldShowCustomImage ? '' : ' (Processing)'}
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2">
              {merchandise.price ? (
                <Money
                  data={merchandise.price}
                  className="text-white font-bold text-sm"
                />
              ) : (
                <span className="text-white font-bold text-sm">
                  Price unavailable
                </span>
              )}
              {merchandise.compareAtPrice && (
                <Money
                  data={merchandise.compareAtPrice}
                  className="text-white/40 line-through text-xs"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions Row - Compact */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
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
          className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:border-white/20"
        >
          <Minus className="w-4 h-4 text-white" />
        </button>
      </CartForm>

      {/* Quantity display */}
      <div className="min-w-[3rem] px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-center">
        <span className="text-white font-semibold text-sm">{quantity}</span>
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
          className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 hover:bg-white/20 hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 disabled:hover:border-white/20"
        >
          <Plus className="w-4 h-4 text-white" />
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
        className="group/remove w-8 h-8 rounded-lg bg-red-500/10 backdrop-blur-sm border border-red-500/20 flex items-center justify-center transition-all duration-200 hover:bg-red-500/20 hover:border-red-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-500/10 disabled:hover:border-red-500/20"
        disabled={disabled}
        aria-label="Remove from cart"
      >
        <Trash2 className="w-4 h-4 text-red-400 group-hover/remove:text-red-300 transition-colors duration-200" />
      </button>
    </CartForm>
  );
}
