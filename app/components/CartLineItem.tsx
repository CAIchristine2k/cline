import { CartForm, Image, Money } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useConfig } from '~/utils/themeContext';
import type { CartLineFragment } from 'storefrontapi.generated';
import type { CartLayout } from './CartMain';
import { Trash2, Plus, Minus } from 'lucide-react';

/**
 * Renders a line in the cart with quantity, title, price, and options.
 * Allows for removal and quantity updates.
 */
export function CartLineItem({
  line,
  layout = 'aside',
}: {
  line: CartLineFragment & { isOptimistic?: boolean };
  layout: CartLayout;
}) {
  const config = useConfig();
  const { id, merchandise, quantity } = line;
  const { product, title, image, selectedOptions } = merchandise;

  const isGiftCard = merchandise.product.handle === 'gift-card';
  const lineItemUrl = `/products/${product.handle}`;

  return (
    <li key={id} className="py-4">
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="relative aspect-square w-20 overflow-hidden rounded-sm border border-primary/10 flex-shrink-0">
          <Link to={lineItemUrl} prefetch="intent">
            {image ? (
              <Image
                data={image}
                className="h-full w-full object-cover transition-transform hover:scale-105"
                alt={title}
                sizes={layout === 'page' ? '96px' : '64px'}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/5">
                {title}
              </div>
            )}
          </Link>
        </div>

        {/* Details */}
        <div className="flex-grow">
          <div className="flex flex-col">
            <Link
              to={lineItemUrl}
              prefetch="intent"
              className="text-primary font-medium hover:text-primary-600 transition-colors"
            >
              {product.title}
            </Link>

            {/* Variant title if it's not "Default Title" */}
            {title !== "Default Title" && (
              <p className="text-sm text-primary-700">{title}</p>
            )}

            {/* Display selected options */}
            {selectedOptions.length > 0 && selectedOptions[0].value !== 'Default Title' && (
              <ul className="mt-1 space-y-1 text-xs text-primary-700">
                {selectedOptions.map((option) => (
                  <li key={option.name}>
                    {option.name}: {option.value}
                  </li>
                ))}
              </ul>
            )}

            {/* Price */}
            <div className="mt-1 flex items-center gap-2">
              <Money data={merchandise.price} className="text-primary-800" />
              {merchandise.compareAtPrice && (
                <Money
                  data={merchandise.compareAtPrice}
                  className="line-through text-red-500 text-sm"
                />
              )}
            </div>

            {/* Quantity and Remove Actions */}
            <div className="mt-2 flex items-center gap-2">
              <CartLineQuantityAdjust line={line} />
              <CartLineRemoveButton lineId={id} disabled={!!line.isOptimistic} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Quantity adjustment form that changes the item's quantity.
 */
function CartLineQuantityAdjust({ line }: { line: CartLineFragment & { isOptimistic?: boolean } }) {
  const config = useConfig();

  if (!line || typeof line?.quantity === 'undefined') return null;

  const { id: lineId, quantity } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center border border-primary/20 rounded-sm bg-white">
      {/* Decrease quantity */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{ lines: [{ id: lineId, quantity: prevQuantity }] }}
      >
        <button
          type="submit"
          name="decrease-quantity"
          aria-label="Decrease quantity"
          disabled={quantity <= 1 || !!line.isOptimistic}
          className="w-8 h-8 flex items-center justify-center disabled:opacity-50 text-primary/80 hover:text-primary hover:bg-primary/5 disabled:hover:bg-transparent transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
      </CartForm>

      {/* Current quantity */}
      <div className="px-3 py-1 text-center min-w-[2.5rem] text-sm font-medium text-primary">
        {quantity}
      </div>

      {/* Increase quantity */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesUpdate}
        inputs={{ lines: [{ id: lineId, quantity: nextQuantity }] }}
      >
        <button
          type="submit"
          name="increase-quantity"
          aria-label="Increase quantity"
          disabled={!!line.isOptimistic}
          className="w-8 h-8 flex items-center justify-center text-primary/80 hover:text-primary hover:bg-primary/5 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </CartForm>
    </div>
  );
}

/**
 * Cart line remove button that removes a line from the cart.
 */
function CartLineRemoveButton({ lineId, disabled = false }: { lineId: string; disabled?: boolean }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds: [lineId] }}
    >
      <button
        type="submit"
        className="ml-3 flex h-8 w-8 items-center justify-center rounded hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={disabled}
        aria-label="Remove from cart"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </button>
    </CartForm>
  );
}
