# useOptimisticCart

The `useOptimisticCart` takes an existing cart object, processes all pending cart actions, and locally mutates the cart with optimistic state. An optimistic cart makes cart actions immediately render in the browser while actions sync to the server. This increases the perceived performance of the application.

```jsx
import {Link} from 'react-router';
import {CartForm, useOptimisticCart} from '@shopify/hydrogen';

// Root loader returns the cart data
export async function loader({context}) {
  return {
    cart: context.cart.get(),
  };
}

// The cart component renders each line item in the cart.
export function Cart({cart}) {
  // `useOptimisticCart` adds optimistic line items to the cart.
  // These line items are displayed in the cart until the server responds.
  const optimisticCart = useOptimisticCart(cart);

  if (!optimisticCart?.lines?.nodes?.length) return <p>Nothing in cart</p>;

  return optimisticCart.lines.nodes.map((line) => (
    <div key={line.id}>
      <Link to={`/products${line.merchandise.product.handle}`}>
        {line.merchandise.product.title}
      </Link>
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{lineIds: [line.id]}}
      >
        {/* Each line item has an `isOptimistic` property. Optimistic line items
        should have actions disabled */}
        <button type="submit" disabled={!!line.isOptimistic}>
          Remove
        </button>
      </CartForm>
    </div>
  ));
}
```

```tsx
import {type LoaderFunctionArgs} from 'react-router';
import {Link} from 'react-router';
import {CartForm, useOptimisticCart} from '@shopify/hydrogen';
import type {Cart} from '@shopify/hydrogen/storefront-api-types';

// Root loader returns the cart data
export async function loader({context}: LoaderFunctionArgs) {
  return {
    cart: context.cart.get(),
  };
}

// The cart component renders each line item in the cart.
export function Cart({cart: originalCart}: {cart: Cart}) {
  // `useOptimisticCart` adds optimistic line items to the cart.
  // These line items are displayed in the cart until the server responds.
  const cart = useOptimisticCart(originalCart);
  if (!cart?.lines?.nodes?.length) return <p>Nothing in cart</p>;

  return cart.lines.nodes.map((line) => (
    <div key={line.id}>
      <Link to={`/products${line.merchandise.product.handle}`}>
        {line.merchandise.product.title}
      </Link>
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesRemove}
        inputs={{lineIds: [line.id]}}
      >
        {/* Each line item has an `isOptimistic` property. Optimistic line items
        should have actions disabled */}
        <button type="submit" disabled={!!line.isOptimistic}>
          Remove
        </button>
      </CartForm>
    </div>
  ));
}
```

## Props

### UseOptimisticCartGeneratedType

#### Returns: OptimisticCart<DefaultCart = {

    lines?: {
      nodes: Array<{id: string; quantity: number; merchandise: {is: string}}>;
    };

}>A new cart object augmented with optimistic state for `lines` and `totalQuantity`. Each cart line item that is optimistically added includes an `isOptimistic` property. Also if the cart has _any_ optimistic state, a root property `isOptimistic` will be set to `true`.

#### Params:

- cart: DefaultCart
  export function useOptimisticCart<
  DefaultCart = {
  lines?: {
  nodes: Array<{id: string; quantity: number; merchandise: {is: string}}>;
  };
  },

  > (cart?: DefaultCart): OptimisticCart<DefaultCart> {
  > const fetchers = useFetchers();

  if (!fetchers || !fetchers.length) return cart as OptimisticCart<DefaultCart>;

  const optimisticCart = (cart as CartReturn)?.lines
  ? (structuredClone(cart) as OptimisticCart<DefaultCart>)
  : ({lines: {nodes: []}} as unknown as OptimisticCart<DefaultCart>);

  const cartLines = optimisticCart.lines.nodes as OptimisticCartLine[];

  let isOptimistic = false;

  for (const {formData} of fetchers) {
  if (!formData) continue;

      const cartFormData = CartForm.getFormInput(formData);

      if (cartFormData.action === CartForm.ACTIONS.LinesAdd) {
        for (const input of cartFormData.inputs.lines) {
          if (!input.selectedVariant) {
            console.error(
              '[h2:error:useOptimisticCart] No selected variant was passed in the cart action. Make sure to pass the selected variant if you want to use an optimistic cart',
            );
            continue;
          }

          const existingLine = cartLines.find(
            (line) =>
              line.merchandise.id ===
              (input.selectedVariant as ProductVariant)?.id,
          );

          isOptimistic = true;

          if (existingLine) {
            existingLine.quantity =
              (existingLine.quantity || 1) + (input.quantity || 1);
            existingLine.isOptimistic = true;
          } else {
            cartLines.unshift({
              id: getOptimisticLineId((input.selectedVariant as any).id),
              merchandise: input.selectedVariant,
              isOptimistic: true,
              quantity: input.quantity || 1,
            } as CartLine & {isOptimistic?: boolean});
          }
        }
      } else if (cartFormData.action === CartForm.ACTIONS.LinesRemove) {
        for (const lineId of cartFormData.inputs.lineIds) {
          const index = cartLines.findIndex((line) => line.id === lineId);

          if (index !== -1) {
            if (isOptimisticLineId(cartLines[index].id)) {
              console.error(
                '[h2:error:useOptimisticCart] Tried to remove an optimistic line that has not been added to the cart yet',
              );
              continue;
            }

            cartLines.splice(index, 1);
            isOptimistic = true;
          } else {
            console.warn(
              `[h2:warn:useOptimisticCart] Tried to remove line '${lineId}' but it doesn't exist in the cart`,
            );
          }
        }
      } else if (cartFormData.action === CartForm.ACTIONS.LinesUpdate) {
        for (const line of cartFormData.inputs.lines) {
          const index = cartLines.findIndex(
            (optimisticLine) => line.id === optimisticLine.id,
          );

          if (index > -1) {
            if (isOptimisticLineId(cartLines[index].id)) {
              console.error(
                '[h2:error:useOptimisticCart] Tried to update an optimistic line that has not been added to the cart yet',
              );
              continue;
            }

            cartLines[index].quantity = line.quantity as number;

            if (cartLines[index].quantity === 0) {
              cartLines.splice(index, 1);
            }

            isOptimistic = true;
          } else {
            console.warn(
              `[h2:warn:useOptimisticCart] Tried to update line '${line.id}' but it doesn't exist in the cart`,
            );
          }
        }
      }

  }

  if (isOptimistic) {
  optimisticCart.isOptimistic = isOptimistic;
  }

  // Calculate the total quantity of the optimistic cart
  optimisticCart.totalQuantity = cartLines.reduce(
  (sum, line) => sum + line.quantity,
  0,
  );

  return optimisticCart;
  }

### LikeACart

### lines

value: `{ nodes: unknown[]; }`

## Related

- [CartForm](https://shopify.dev/docs/api/hydrogen/components/cartform)
