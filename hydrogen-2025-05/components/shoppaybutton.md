# ShopPayButton

The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.

```jsx
import {ShopPayButton} from '@shopify/hydrogen';

export function AddVariantQuantity1({variantId, storeDomain}) {
  return <ShopPayButton variantIds={[variantId]} storeDomain={storeDomain} />;
}

export function AddVariantQuantityMultiple({variantId, quantity, storeDomain}) {
  return (
    <ShopPayButton
      variantIdsAndQuantities={[{id: variantId, quantity}]}
      storeDomain={storeDomain}
    />
  );
}

export function ChannelAttribution({channel, variantId, storeDomain}) {
  return (
    <ShopPayButton
      channel={channel}
      variantIds={[variantId]}
      storeDomain={storeDomain}
    />
  );
}

```

```tsx
import {ShopPayButton} from '@shopify/hydrogen';

export function AddVariantQuantity1({
  variantId,
  storeDomain,
}: {
  variantId: string;
  storeDomain: string;
}) {
  return <ShopPayButton variantIds={[variantId]} storeDomain={storeDomain} />;
}

export function AddVariantQuantityMultiple({
  variantId,
  quantity,
  storeDomain,
}: {
  variantId: string;
  quantity: number;
  storeDomain: string;
}) {
  return (
    <ShopPayButton
      variantIdsAndQuantities={[{id: variantId, quantity}]}
      storeDomain={storeDomain}
    />
  );
}

export function ChannelAttribution({
  channel,
  variantId,
  storeDomain,
}: {
  channel: 'headless' | 'hydrogen';
  variantId: string;
  storeDomain: string;
}) {
  return (
    <ShopPayButton
      channel={channel}
      variantIds={[variantId]}
      storeDomain={storeDomain}
    />
  );
}

```

## Props

### ShopPayButtonStyleProps

### className

value: `string`

A string of classes to apply to the `div` that wraps the Shop Pay button.

### width

value: `string`

A string that's applied to the [CSS custom property (variable)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) `--shop-pay-button-width` for the [Buy with Shop Pay component](https://shopify.dev/custom-storefronts/tools/web-components#buy-with-shop-pay-component).

### ShopPayDomainProps

### storeDomain

value: `string`

The domain of your Shopify storefront URL (eg: `your-store.myshopify.com`).

### ShopPayChannelAttribution

### channel

value: `'headless' | 'hydrogen'`

A string that adds channel attribution to the order. Can be either `headless` or `hydrogen`

### ShopPayVariantIds

### variantIds

value: `string[]`

An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`.

### variantIdsAndQuantities

value: `never`

An array of variant IDs and quantities to purchase with Shop Pay.

### ShopPayVariantAndQuantities

### variantIds

value: `never`

An array of IDs of the variants to purchase with Shop Pay. This will only ever have a quantity of 1 for each variant. If you want to use other quantities, then use `variantIdsAndQuantities`.

### variantIdsAndQuantities

value: `Array<{
    id: string;
    quantity: number;
  }>`

An array of variant IDs and quantities to purchase with Shop Pay.

## Examples

The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.


If `<ShopifyProvider>` context provider is used in your app, you can use the `<ShopPayButton>` without supplying a `storeDomain` prop

```jsx
import {ShopifyProvider, ShopPayButton} from '@shopify/hydrogen';

export default function App() {
  return (
    <ShopifyProvider
      storeDomain="my-store"
      storefrontToken="abc123"
      storefrontApiVersion="2025-04"
      countryIsoCode="CA"
      languageIsoCode="EN"
    >
      <AddVariantQuantity1 variantId="gid://shopify/ProductVariant/1" />
    </ShopifyProvider>
  );
}

export function AddVariantQuantity1({variantId}) {
  return <ShopPayButton variantIds={[variantId]} />;
}

```

```tsx
import {ShopifyProvider, ShopPayButton} from '@shopify/hydrogen';

export default function App() {
  return (
    <ShopifyProvider
      storeDomain="my-store"
      storefrontToken="abc123"
      storefrontApiVersion="2025-04"
      countryIsoCode="CA"
      languageIsoCode="EN"
    >
      <AddVariantQuantity1 variantId="gid://shopify/ProductVariant/1" />
    </ShopifyProvider>
  );
}

export function AddVariantQuantity1({variantId}: {variantId: string}) {
  return <ShopPayButton variantIds={[variantId]} />;
}

```

## Examples

The `ShopPayButton` component renders a button that redirects to the Shop Pay checkout. It renders a [`<shop-pay-button>`](https://shopify.dev/custom-storefronts/tools/web-components) custom element, for which it will lazy-load the source code automatically.


If `<ShopifyProvider>` context provider is used in your app, you can use the `<ShopPayButton>` without supplying a `storeDomain` prop

```jsx
import {ShopifyProvider, ShopPayButton} from '@shopify/hydrogen';

export default function App() {
  return (
    <ShopifyProvider
      storeDomain="my-store"
      storefrontToken="abc123"
      storefrontApiVersion="2025-04"
      countryIsoCode="CA"
      languageIsoCode="EN"
    >
      <AddVariantQuantity1 variantId="gid://shopify/ProductVariant/1" />
    </ShopifyProvider>
  );
}

export function AddVariantQuantity1({variantId}) {
  return <ShopPayButton variantIds={[variantId]} />;
}

```

```tsx
import {ShopifyProvider, ShopPayButton} from '@shopify/hydrogen';

export default function App() {
  return (
    <ShopifyProvider
      storeDomain="my-store"
      storefrontToken="abc123"
      storefrontApiVersion="2025-04"
      countryIsoCode="CA"
      languageIsoCode="EN"
    >
      <AddVariantQuantity1 variantId="gid://shopify/ProductVariant/1" />
    </ShopifyProvider>
  );
}

export function AddVariantQuantity1({variantId}: {variantId: string}) {
  return <ShopPayButton variantIds={[variantId]} />;
}

```

